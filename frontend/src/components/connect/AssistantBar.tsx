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

  function handleSpeak() {
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

  return (
    <div className="assistant-bar">
      <div className="assistant-btns">
        {ttsSupported && (
          <button
            type="button"
            className="speak-btn-hero"
            onClick={handleSpeak}
            aria-label="Listen"
          >
            🔊
          </button>
        )}
        {sttSupported && (
          <button
            type="button"
            className={`speak-btn-mic${listening ? ' speak-btn-mic--active' : ''}`}
            onClick={handleMic}
            aria-label={listening ? 'Stop listening' : 'Tap to speak'}
          >
            {listening ? '⏹' : '🎤'}
          </button>
        )}
      </div>
      {listening && transcript && (
        <p className="assistant-transcript">{transcript}</p>
      )}
    </div>
  );
}
