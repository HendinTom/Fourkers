import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import type { PhoneticStep } from '../../data/lessonContent';

interface PhoneticBlockProps extends PhoneticStep {
  /** Used for staggered entrance animation */
  index: number;
}

/**
 * One row in the phonetic breakdown.
 * Shows a large phonetic symbol and a 🔊 button that speaks the sound.
 *
 * Future enhancement:
 *   Replace useSpeechSynthesis with a prerecorded audio file per sound
 *   for accurate pronunciation (especially for non-English phonemes).
 *   Add field:  audioSrc: string | null  to PhoneticStep.
 */
export default function PhoneticBlock({ sound, audioText, index }: PhoneticBlockProps) {
  const { speak } = useSpeechSynthesis();

  return (
    <div
      className="phonetic-block"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <span className="phonetic-block__sound" aria-label={`Sound: ${sound}`}>
        {sound}
      </span>
      <button
        type="button"
        className="phonetic-block__btn"
        onClick={() => speak(audioText)}
        aria-label={`Hear the sound: ${sound}`}
      >
        🔊
      </button>
    </div>
  );
}
