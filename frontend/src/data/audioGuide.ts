/**
 * PAGE-LEVEL AND SECTION-LEVEL AUDIO GUIDE ENTRIES
 * ==========================================================================
 * Each entry has:
 *   rohingyaSrc  — path to prerecorded Rohingya .mp3 (null = not yet recorded)
 *   labelEn      — English text used as aria-label AND as DEMO_MODE TTS text
 *
 * HOW TO ADD REAL ROHINGYA AUDIO:
 *   1. Record the sentence with a Rohingya speaker or certified translator.
 *   2. Save the .mp3 to:  frontend/public/audio/rohingya/<filename>.mp3
 *   3. Replace null with:  '/audio/rohingya/<filename>.mp3'
 *   4. Set DEMO_MODE = false in useRohingyaAudio.ts
 * ==========================================================================
 */
import type { AudioEntry } from '../types/audio';

export const AUDIO_GUIDE = {
  /**
   * Plays when user taps 🔊 on the Learn page heading.
   * Rohingya meaning (approximate):
   *   "Press the big green button below to start learning.
   *    Turn up your volume. Be ready to listen and speak."
   *
   * TODO: Record and place file at:
   *       /public/audio/rohingya/learn-page-guide.mp3
   */
  pageGuide: {
    rohingyaSrc: null, // → '/audio/rohingya/learn-page-guide.mp3'
    labelEn:
      'Press the big green button below to start learning English. ' +
      'Turn up your volume and be ready to listen and speak.',
  } satisfies AudioEntry,

  /**
   * Plays when user taps 🔊 on the progress bar section.
   * TODO: /public/audio/rohingya/learn-progress-guide.mp3
   */
  progressGuide: {
    rohingyaSrc: null, // → '/audio/rohingya/learn-progress-guide.mp3'
    labelEn:
      'This shows how many lessons you have finished. ' +
      'Keep going — you are doing great!',
  } satisfies AudioEntry,

  /**
   * Plays when user taps 🔊 near the "More lessons" selector.
   * TODO: /public/audio/rohingya/learn-lessons-guide.mp3
   */
  lessonsGuide: {
    rohingyaSrc: null, // → '/audio/rohingya/learn-lessons-guide.mp3'
    labelEn:
      'Press this button to see all lessons. Choose a lesson to start learning.',
  } satisfies AudioEntry,
} as const;
