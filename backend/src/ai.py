import shutil
import subprocess
from typing import cast
import torch
import torchaudio
import numpy as np
from transformers import Wav2Vec2FeatureExtractor, Wav2Vec2Model
from scipy.spatial.distance import cosine


def _select_device() -> torch.device:
    if torch.backends.mps.is_available() and torch.backends.mps.is_built():
        return torch.device("mps")
    if torch.cuda.is_available():
        return torch.device("cuda")
    return torch.device("cpu")


def _load_audio_with_ffmpeg(audio_path: str, target_sr: int) -> torch.Tensor:
    if shutil.which("ffmpeg") is None:
        raise RuntimeError(
            "ffmpeg not found. Install ffmpeg or torchcodec to enable MP3 decoding."
        )

    cmd = [
        "ffmpeg",
        "-v",
        "error",
        "-i",
        audio_path,
        "-f",
        "f32le",
        "-ac",
        "1",
        "-ar",
        str(target_sr),
        "-",
    ]
    proc = subprocess.run(cmd, capture_output=True, check=False)
    if proc.returncode != 0 or not proc.stdout:
        stderr = proc.stderr.decode("utf-8", errors="ignore").strip()
        raise RuntimeError(f"ffmpeg decode failed: {stderr or 'unknown error'}")

    audio = np.frombuffer(proc.stdout, dtype=np.float32)
    if audio.size == 0:
        raise RuntimeError("ffmpeg returned empty audio buffer.")
    return torch.from_numpy(audio)


def _load_audio(audio_path: str, target_sr: int = 16000) -> torch.Tensor:
    try:
        waveform, sr = torchaudio.load(audio_path)
        if waveform.dim() > 1:
            waveform = waveform.mean(dim=0)
        if sr != target_sr:
            waveform = torchaudio.functional.resample(waveform, sr, target_sr)
        return waveform
    except Exception:
        return _load_audio_with_ffmpeg(audio_path, target_sr)


feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained("facebook/wav2vec2-base")
model: Wav2Vec2Model = Wav2Vec2Model.from_pretrained("facebook/wav2vec2-base")
model.eval()

_DEVICE = _select_device()
try:
    model = cast(Wav2Vec2Model, model.to(_DEVICE))
except Exception:
    _DEVICE = torch.device("cpu")
    model = cast(Wav2Vec2Model, model.to(_DEVICE))

def get_embedding(audio_path):
    waveform = _load_audio(audio_path, target_sr=16000)
    audio = waveform.detach().cpu().numpy()
    try:
        inputs = feature_extractor(audio, sampling_rate=16000)
    except TypeError:
        inputs = feature_extractor(audio)

    with torch.no_grad():
        input_values = inputs["input_values"]
        if not torch.is_tensor(input_values):
            input_values = np.asarray(input_values, dtype=np.float32)
            input_values = torch.from_numpy(input_values)
        if input_values.dim() == 1:
            input_values = input_values.unsqueeze(0)

        attention_mask = inputs.get("attention_mask")
        if attention_mask is not None and not torch.is_tensor(attention_mask):
            attention_mask = np.asarray(attention_mask, dtype=np.int64)
            attention_mask = torch.from_numpy(attention_mask)

        input_values = input_values.to(_DEVICE)
        if attention_mask is not None:
            attention_mask = attention_mask.to(_DEVICE)

        outputs = model(input_values=input_values, attention_mask=attention_mask)

    embedding = outputs.last_hidden_state.mean(dim=1)
    embedding = torch.nn.functional.normalize(embedding, dim=-1)

    return embedding.detach().cpu().squeeze().numpy()

def pronunciation_score(reference, attempt):
    emb1 = get_embedding(reference)
    emb2 = get_embedding(attempt)

    similarity = 1 - cosine(emb1, emb2)
    similarity = max(0.0, min(1.0, float(similarity)))

    return similarity * 100

if __name__ == "__main__":
    import json
    import sys

    if len(sys.argv) < 3:
        print("Usage: python ai.py <reference_audio> <attempt_audio>")
        sys.exit(1)

    score = pronunciation_score(sys.argv[1], sys.argv[2])
    print(json.dumps({"score": round(float(score), 2)}))
