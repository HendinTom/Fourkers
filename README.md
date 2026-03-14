# FirstWords.AI

FirstWords.AI is a web app that helps newcomers build day-to-day life skills in Canada while practicing English pronunciation. It combines simple, audio-first lessons with a community connection hub for people, events, and trusted leaders.

**What's Unique**
- Audio-first UX designed for low literacy or language barriers, with guided prompts and phonetic breakdowns.
- Built-in pronunciation practice that scores attempts against a reference audio sample.
- Community discovery features: nearby people, local events, and verified leaders with language filters.
- Rohingya-first audio workflow with fallback TTS for demos.

**Install And Run**

**Prerequisites**
- Node.js (for the React frontend and Express backend)
- Python 3 + pip (for pronunciation scoring)
- `ffmpeg` (recommended for reliable audio decoding)
- `pytorch` (For AI capabilities)

**Backend**
1. `cd backend`
2. `npm install`
3. `pip install -r requirements.txt`
4. `npm run dev`

The backend runs on `http://localhost:3000`.

If your Python executable is not `python`, set `PYTHON_PATH`:
`PYTHON_PATH=python3 npm run dev`

**Frontend**
1. `cd frontend`
2. `npm install`
3. `npm run dev`

The frontend will default to `http://localhost:5173`.

To point the UI at a different backend, set:
`VITE_API_URL=http://localhost:3000`

**How It Works**
- The React frontend provides two main sections: Learn and Connect.
- Learn uses lesson data in `frontend/src/data` to show phonetic steps, images, and audio guidance.
- Users record a pronunciation attempt in the browser; the audio is uploaded to the backend along with a reference file.
- The Express server (`backend/src/server.ts`) saves uploads, spawns `backend/src/ai.py`, and returns the score.
- The Python model extracts Wav2Vec2 embeddings and computes cosine similarity to produce a 0-100 score.
- Connect uses curated data for people, events, and leaders, filters by language, and can sort by distance when geolocation is available.

**Reference Audio**
- Add reference pronunciations in `frontend/src/assets` (for example `Boos.m4a`).
- Lessons can reference a specific file via `referenceAudioSrc` in `frontend/src/data/lessonContent.ts`.
