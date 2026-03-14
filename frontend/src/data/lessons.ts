import type { AudioEntry } from '../types/audio';

export type LessonStatus = 'completed' | 'next' | 'available' | 'locked';

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  status: LessonStatus;
  /**
   * English narration text — used as aria-label and as DEMO_MODE TTS.
   * Replace with real Rohingya audio via the AudioEntry fields below.
   */
  narrationText: string;
  /**
   * Audio played when the user presses ▶ (Start Lesson).
   * TODO: Record each intro in Rohingya.
   *       Place file at /public/audio/rohingya/lesson-<id>-intro.mp3
   *       Then set rohingyaSrc: '/audio/rohingya/lesson-<id>-intro.mp3'
   */
  lessonIntroEntry: AudioEntry;
  /**
   * Audio played when the user taps 🔊 on the active lesson card.
   * Explains what this lesson is about.
   * TODO: Place file at /public/audio/rohingya/lesson-<id>-help.mp3
   */
  cardHelpEntry: AudioEntry;
}

export const LESSONS: Lesson[] = [
  {
    id: 'transit',
    title: 'Toronto transit & bus',
    icon: '🚌',
    status: 'completed',
    narrationText:
      'Toronto transit and bus. Learn how to use the TTC and read bus stop signs in Toronto.',
    lessonIntroEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-transit-intro.mp3'
      labelEn: 'Starting lesson: Toronto transit and bus.',
    },
    cardHelpEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-transit-help.mp3'
      labelEn:
        'Toronto transit and bus. Learn how to use the TTC and read bus stop signs in Toronto.',
    },
  },
  {
    id: 'english',
    title: 'English everyday',
    icon: '🗣️',
    status: 'completed',
    narrationText:
      'English everyday. Practice common phrases used in shops, clinics, and neighbourhoods.',
    lessonIntroEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-english-intro.mp3'
      labelEn: 'Starting lesson: English everyday.',
    },
    cardHelpEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-english-help.mp3'
      labelEn:
        'English everyday. Practice common phrases used in shops, clinics, and neighbourhoods.',
    },
  },
  {
    id: 'housing',
    title: 'Housing & rights',
    icon: '🏠',
    status: 'completed',
    narrationText:
      'Housing and rights. Understand your rights as a tenant in Toronto and how to contact a landlord.',
    lessonIntroEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-housing-intro.mp3'
      labelEn: 'Starting lesson: Housing and rights.',
    },
    cardHelpEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-housing-help.mp3'
      labelEn:
        'Housing and rights. Understand your rights as a tenant in Toronto and how to contact a landlord.',
    },
  },
  {
    id: 'health',
    title: 'Health & services',
    icon: '🏥',
    status: 'next',
    narrationText:
      'Health and services. Learn how to access a doctor, walk-in clinic, and pharmacy in Toronto.',
    lessonIntroEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-health-intro.mp3'
      labelEn: 'Starting lesson: Health and services.',
    },
    cardHelpEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-health-help.mp3'
      labelEn:
        'Health and services. Learn how to access a doctor, walk-in clinic, and pharmacy in Toronto.',
    },
  },
  {
    id: 'grocery',
    title: 'Grocery shopping',
    icon: '🛒',
    status: 'available',
    narrationText:
      'Grocery shopping. Learn how to shop at Canadian grocery stores and understand food labels.',
    lessonIntroEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-grocery-intro.mp3'
      labelEn: 'Starting lesson: Grocery shopping.',
    },
    cardHelpEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-grocery-help.mp3'
      labelEn:
        'Grocery shopping. Learn how to shop at Canadian grocery stores and understand food labels.',
    },
  },
  {
    id: 'school',
    title: 'School & children',
    icon: '🏫',
    status: 'available',
    narrationText:
      'School and children. Learn about the school system in Toronto and how to enrol your children.',
    lessonIntroEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-school-intro.mp3'
      labelEn: 'Starting lesson: School and children.',
    },
    cardHelpEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-school-help.mp3'
      labelEn:
        'School and children. Learn about the school system in Toronto and how to enrol your children.',
    },
  },
  {
    id: 'job',
    title: 'Job interview basics',
    icon: '💼',
    status: 'available',
    narrationText:
      'Job interview basics. Learn how to introduce yourself and prepare for a job interview in Canada.',
    lessonIntroEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-job-intro.mp3'
      labelEn: 'Starting lesson: Job interview basics.',
    },
    cardHelpEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-job-help.mp3'
      labelEn:
        'Job interview basics. Learn how to introduce yourself and prepare for a job interview in Canada.',
    },
  },
  {
    id: 'emergency',
    title: 'Emergency help',
    icon: '🆘',
    status: 'available',
    narrationText:
      'Emergency help. Learn the numbers and words to use when you need urgent help in Canada.',
    lessonIntroEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-emergency-intro.mp3'
      labelEn: 'Starting lesson: Emergency help.',
    },
    cardHelpEntry: {
      rohingyaSrc: null, // → '/audio/rohingya/lesson-emergency-help.mp3'
      labelEn:
        'Emergency help. Learn the numbers and words to use when you need urgent help in Canada.',
    },
  },
];

export const TOTAL_LESSONS     = LESSONS.length;
export const COMPLETED_LESSONS = LESSONS.filter((l) => l.status === 'completed').length;
export const PROGRESS_PCT      = Math.round((COMPLETED_LESSONS / TOTAL_LESSONS) * 100);
