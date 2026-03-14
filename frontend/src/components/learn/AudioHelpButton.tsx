import { useRohingyaAudio } from '../../hooks/useRohingyaAudio';
import type { AudioEntry } from '../../types/audio';

interface AudioHelpButtonProps {
  entry: AudioEntry;
  /** Visual size variant */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Reusable audio guidance button.
 * Tapping it plays the Rohingya audio for the given entry.
 * Falls back to English TTS in DEMO_MODE (see useRohingyaAudio.ts).
 */
export default function AudioHelpButton({
  entry,
  size = 'md',
  className = '',
}: AudioHelpButtonProps) {
  const { play, active } = useRohingyaAudio();

  return (
    <button
      type="button"
      className={[
        'audio-help-btn',
        `audio-help-btn--${size}`,
        active ? 'audio-help-btn--active' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => play(entry)}
      aria-label={active ? 'Playing audio…' : entry.labelEn}
      aria-pressed={active}
    >
      {active ? '⏸' : '🔊'}
    </button>
  );
}
