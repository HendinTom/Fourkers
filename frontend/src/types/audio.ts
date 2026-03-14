/**
 * AudioEntry — describes one piece of audio guidance.
 *
 * To add real Rohingya audio for any entry:
 *   1. Record a .mp3 with a Rohingya speaker / translator
 *   2. Place the file in:  /public/audio/rohingya/<filename>.mp3
 *   3. Set   rohingyaSrc: '/audio/rohingya/<filename>.mp3'
 *
 * When rohingyaSrc is null the audio engine tries browser Rohingya TTS,
 * then falls back to English TTS in DEMO_MODE (see useRohingyaAudio.ts).
 */
export interface AudioEntry {
  /** Relative path to a prerecorded Rohingya audio file, or null if not yet recorded. */
  rohingyaSrc: string | null;
  /**
   * English text used as:
   *   – the button's accessible aria-label
   *   – spoken text in DEMO_MODE when no Rohingya audio is available
   */
  labelEn: string;
}
