import { useRef, useState } from 'react';

interface MicButtonProps {
  /**
   * The word the user is expected to say.
   * Will be used for pronunciation scoring once speech recognition is wired up.
   */
  expectedWord: string;
  /** Optional prerecorded audio file for the correct pronunciation. */
  referenceAudioSrc: string | null;
  /** Called when the score threshold is met and we should advance. */
  onAdvance?: () => void;
}

/**
 * Large microphone practice button.
 *
 * Records microphone audio and sends it to the backend along with a
 * prerecorded reference audio file for pronunciation scoring.
 */
const SCORE_THRESHOLD = 80;
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function pickMimeType(): string | null {
  const candidates = [
    'audio/mp4',
    'audio/mpeg',
    'audio/webm;codecs=opus',
    'audio/webm',
  ];
  for (const mime of candidates) {
    if (MediaRecorder.isTypeSupported(mime)) return mime;
  }
  return null;
}

function extensionFromMime(mime: string): string {
  if (mime.includes('mp4')) return 'm4a';
  if (mime.includes('mpeg')) return 'mp3';
  if (mime.includes('webm')) return 'webm';
  return 'audio';
}

export default function MicButton({
  expectedWord,
  referenceAudioSrc,
  onAdvance,
}: MicButtonProps) {
  const [status, setStatus] = useState<'idle' | 'recording' | 'uploading'>('idle');
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  async function fetchReferenceFile(): Promise<File> {
    if (!referenceAudioSrc) {
      throw new Error('Reference audio is not available yet.');
    }
    const response = await fetch(referenceAudioSrc);
    if (!response.ok) {
      throw new Error('Failed to load reference audio.');
    }
    const blob = await response.blob();
    const mime = blob.type || 'audio/mp4';
    const ext = extensionFromMime(mime);
    return new File([blob], `reference.${ext}`, { type: mime });
  }

  async function sendForScoring(attemptBlob: Blob) {
    setStatus('uploading');
    try {
      const referenceFile = await fetchReferenceFile();
      const attemptMime = attemptBlob.type || 'audio/webm';
      const attemptExt = extensionFromMime(attemptMime);
      const attemptFile = new File([attemptBlob], `${expectedWord}.${attemptExt}`, {
        type: attemptMime,
      });

      const formData = new FormData();
      formData.append('reference', referenceFile);
      formData.append('attempt', attemptFile);

      const response = await fetch(`${API_BASE}/api/pronunciation`, {
        method: 'POST',
        body: formData,
      });

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      const payload = (typeof data === 'object' && data !== null) ? data as Record<string, unknown> : null;
      if (!response.ok) {
        const errorText =
          (typeof payload?.error === 'string' && payload.error) ||
          (typeof payload?.details === 'string' && payload.details) ||
          'Scoring failed.';
        throw new Error(errorText);
      }

      const score = Number(payload?.score ?? 0);
      if (score >= SCORE_THRESHOLD) {
        setError(null);
        onAdvance?.();
      } else {
        setError(`Score ${score.toFixed(1)}%. Try again.`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Scoring failed.';
      setError(message);
    } finally {
      setStatus('idle');
    }
  }

  async function startRecording() {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Microphone access is not supported in this browser.');
      return;
    }
    if (typeof MediaRecorder === 'undefined') {
      setError('Recording is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });
        chunksRef.current = [];
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        await sendForScoring(blob);
      };

      recorder.start();
      recorderRef.current = recorder;
      setStatus('recording');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Microphone access failed.';
      setError(message);
    }
  }

  function stopRecording() {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
      recorderRef.current = null;
    }
    setStatus('uploading');
  }

  function handleRecord() {
    if (status === 'recording') {
      stopRecording();
      return;
    }
    if (status === 'uploading') return;
    startRecording();
  }

  return (
    <div className="mic-btn-wrap">
      <button
        type="button"
        className="mic-practice-btn"
        onClick={handleRecord}
        disabled={status === 'uploading'}
        aria-pressed={status === 'recording'}
        aria-label="Record yourself saying the word"
      >
        <span className="mic-practice-btn__icon" aria-hidden="true">🎤</span>
      </button>
      <p className="mic-btn-hint" aria-live="polite">
        {error
          ? error
          : status === 'recording'
            ? 'Recording… tap to stop'
            : status === 'uploading'
              ? 'Checking pronunciation…'
              : 'Try saying it'}
      </p>
    </div>
  );
}
