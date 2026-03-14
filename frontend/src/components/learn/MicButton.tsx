interface MicButtonProps {
  /**
   * The word the user is expected to say.
   * Will be used for pronunciation scoring once speech recognition is wired up.
   */
  expectedWord: string;
}

/**
 * Large microphone practice button.
 *
 * Real recording is NOT yet implemented.
 * The button exists so the UI is complete and the structure is ready.
 *
 * ── WHERE TO ADD SPEECH RECOGNITION ──────────────────────────────────────
 * When ready, implement inside handleRecord():
 *
 *   Step 1 — Request microphone permission:
 *     navigator.mediaDevices.getUserMedia({ audio: true })
 *
 *   Step 2 — Start recognition:
 *     const recognition = new (window.SpeechRecognition
 *       || window.webkitSpeechRecognition)();
 *     recognition.lang = 'en-CA';
 *     recognition.start();
 *
 *   Step 3 — Capture transcript:
 *     recognition.onresult = (e) => {
 *       const transcript = e.results[0][0].transcript.toLowerCase();
 *     }
 *
 *   Step 4 — Score / compare:
 *     const correct = transcript.includes(expectedWord.toLowerCase());
 *     // Show feedback: correct ✓ or try again ✗
 *
 *   Step 5 — Connect a pronunciation API (e.g. Azure Cognitive Services)
 *     for phoneme-level scoring and Rohingya speaker feedback.
 * ─────────────────────────────────────────────────────────────────────────
 */
export default function MicButton({ expectedWord: _expectedWord }: MicButtonProps) {
  function handleRecord() {
    if (false) {
      // TODO: Speech recognition and pronunciation evaluation go here.
      // See the JSDoc comment above for the full implementation plan.
    }
  }

  return (
    <div className="mic-btn-wrap">
      <button
        type="button"
        className="mic-practice-btn"
        onClick={handleRecord}
        aria-label="Record yourself saying the word"
      >
        <span className="mic-practice-btn__icon" aria-hidden="true">🎤</span>
      </button>
      <p className="mic-btn-hint" aria-hidden="true">
        Try saying it
      </p>
    </div>
  );
}
