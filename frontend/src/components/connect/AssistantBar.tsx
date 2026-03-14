import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import type { ConnectSection, SpeakFn } from '../../types/connect';

interface AssistantBarProps {
  text: string;
  speak: SpeakFn;
  ttsSupported: boolean;
  onSectionSelect: (section: ConnectSection) => void;
}

function matchSection(raw: string): ConnectSection {
  const t = raw.toLowerCase();
  if (t.includes('people') || t.includes('meet') || t.includes('friend')) return 'people';
  if (
    t.includes('event') ||
    t.includes('walk') ||
    t.includes('kitchen') ||
    t.includes('circle') ||
    t.includes('class')
  )
    return 'events';
  if (t.includes('leader') || t.includes('help') || t.includes('talk') || t.includes('support'))
    return 'leaders';
  return null;
}

export default function AssistantBar({
  text,
  speak,
  ttsSupported,
  onSectionSelect,
}: AssistantBarProps) {
  const { supported: sttSupported, listening, transcript, start, stop } = useSpeechRecognition();

  function handleHearAgain() {
    speak(text);
  }

  function handleMic() {
    if (listening) {
      stop();
      return;
    }
    start((finalText) => {
      const section = matchSection(finalText);
      if (section) {
        stop();
        onSectionSelect(section);
      }
    });
  }

  const displayText = listening && transcript ? transcript : text;

  return (
    <div className={`assistant-bar${listening ? ' assistant-bar--listening' : ''}`}>
      <div className="assistant-bar__avatar" aria-hidden="true">
        <span className="assistant-bar__emoji">🌟</span>
      </div>
      <div className="assistant-bar__body">
        <p className="assistant-bar__text">{displayText}</p>
        <div className="assistant-bar__actions">
          {ttsSupported && (
            <button
              type="button"
              className="assistant-btn assistant-btn--replay"
              onClick={handleHearAgain}
            >
              🔊 Hear again
            </button>
          )}
          {sttSupported && (
            <button
              type="button"
              className={`assistant-btn assistant-btn--mic${listening ? ' assistant-btn--active' : ''}`}
              onClick={handleMic}
              aria-label={listening ? 'Stop listening' : 'Tap to speak'}
            >
              {listening ? '⏹ Stop' : '🎤 Speak'}
            </button>
          )}
        </div>
        {listening && !transcript && (
          <p className="assistant-bar__hint">
            Try saying: "Meet people", "Events", or "Leader"
          </p>
        )}
      </div>
    </div>
  );
}
