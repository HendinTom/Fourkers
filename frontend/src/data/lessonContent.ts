/**
 * Detailed lesson content for each Learn lesson.
 *
 * Each entry drives a full LessonPage:
 *   - imageSrc      → real illustration (add to /public/assets/)
 *   - imageEmoji    → fallback visual until a real image is added
 *   - phonetics     → step-by-step sound breakdown
 *   - combined      → phonetic spelling of how it sounds
 *
 * TO ADD A NEW LESSON:
 *   1. Add an entry here.
 *   2. Add an entry to LESSONS in lessons.ts with the matching id.
 *   3. Optionally add an image to /public/assets/<id>.png.
 */

export interface PhoneticStep {
  /** The phonetic symbol shown on screen (e.g. "B", "OO") */
  sound: string;
  /** The spoken sound for TTS when the 🔊 button is tapped (e.g. "buh") */
  audioText: string;
}

export interface LessonContent {
  id: string;
  title: string;
  /** Path to a real illustration, e.g. '/assets/bus.png'. null = not yet added. */
  imageSrc: string | null;
  /** Large emoji shown when imageSrc is null */
  imageEmoji: string;
  imageAlt: string;
  /** Step-by-step phonetic breakdown */
  phonetics: PhoneticStep[];
  /** How the word sounds when spelled phonetically (shown large below the steps) */
  combined: string;
  /** Text spoken by TTS for the combined pronunciation */
  combinedAudio: string;
  /** Optional prerecorded audio file for the correct pronunciation */
  referenceAudioSrc: string | null;
}

export const LESSON_CONTENT: LessonContent[] = [
  {
    id: 'transit',
    title: 'Bus',
    imageSrc: null,           // → '/assets/bus.png'  when ready
    imageEmoji: '🚌',
    imageAlt: 'A TTC city bus',
    phonetics: [
      { sound: 'B',  audioText: 'buh'  },
      { sound: 'U',  audioText: 'uh'   },
      { sound: 'SS', audioText: 'sss'  },
    ],
    combined: 'B · UH · SS',
    combinedAudio: 'bus',
    referenceAudioSrc: null, // → '/audio/rohingya/lesson-transit.m4a'
  },
  {
    id: 'english',
    title: 'Hello',
    imageSrc: null,           // → '/assets/hello.png'
    imageEmoji: '👋',
    imageAlt: 'A person waving hello',
    phonetics: [
      { sound: 'H',  audioText: 'huh'  },
      { sound: 'EH', audioText: 'eh'   },
      { sound: 'L',  audioText: 'lll'  },
      { sound: 'OH', audioText: 'oh'   },
    ],
    combined: 'HEH · LOH',
    combinedAudio: 'hello',
    referenceAudioSrc: null, // → '/audio/rohingya/lesson-english.m4a'
  },
  {
    id: 'housing',
    title: 'Door',
    imageSrc: null,           // → '/assets/door.png'
    imageEmoji: '🚪',
    imageAlt: 'A door',
    phonetics: [
      { sound: 'D',  audioText: 'duh'  },
      { sound: 'AW', audioText: 'aw'   },
      { sound: 'R',  audioText: 'rrr'  },
    ],
    combined: 'D · AW · R',
    combinedAudio: 'door',
    referenceAudioSrc: null, // → '/audio/rohingya/lesson-housing.m4a'
  },
  {
    id: 'health',
    title: 'Boos',
    imageSrc: null,           // → '/assets/doctor.png'
    imageEmoji: '🚌',
    imageAlt: 'Boos (Ruaingga word)',
    phonetics: [
      { sound: 'B',  audioText: 'buh'  },
      { sound: 'O',  audioText: 'oh'   },
      { sound: 'OO', audioText: 'ouh'  },
      { sound: 'S',  audioText: 'shh'  },
    ],
    combined: 'B · O · OO · S',
    combinedAudio: 'boos',
    referenceAudioSrc: null, // → '/audio/rohingya/lesson-health.m4a'
  },
  {
    id: 'grocery',
    title: 'Food',
    imageSrc: null,           // → '/assets/food.png'
    imageEmoji: '🥗',
    imageAlt: 'A plate of food',
    phonetics: [
      { sound: 'F',  audioText: 'fff'  },
      { sound: 'OO', audioText: 'ooh'  },
      { sound: 'D',  audioText: 'duh'  },
    ],
    combined: 'F · OOD',
    combinedAudio: 'food',
    referenceAudioSrc: null, // → '/audio/rohingya/lesson-grocery.m4a'
  },
  {
    id: 'school',
    title: 'School',
    imageSrc: null,           // → '/assets/school.png'
    imageEmoji: '🏫',
    imageAlt: 'A school building',
    phonetics: [
      { sound: 'SK', audioText: 'skuh' },
      { sound: 'OO', audioText: 'ooh'  },
      { sound: 'L',  audioText: 'lll'  },
    ],
    combined: 'SK · OOL',
    combinedAudio: 'school',
    referenceAudioSrc: null, // → '/audio/rohingya/lesson-school.m4a'
  },
  {
    id: 'job',
    title: 'Work',
    imageSrc: null,           // → '/assets/work.png'
    imageEmoji: '💼',
    imageAlt: 'A briefcase',
    phonetics: [
      { sound: 'W',  audioText: 'wuh'  },
      { sound: 'ER', audioText: 'er'   },
      { sound: 'K',  audioText: 'kuh'  },
    ],
    combined: 'W · ERK',
    combinedAudio: 'work',
    referenceAudioSrc: null, // → '/audio/rohingya/lesson-job.m4a'
  },
  {
    id: 'emergency',
    title: 'Help',
    imageSrc: null,           // → '/assets/help.png'
    imageEmoji: '🆘',
    imageAlt: 'Help / emergency sign',
    phonetics: [
      { sound: 'H',  audioText: 'huh'  },
      { sound: 'EH', audioText: 'eh'   },
      { sound: 'L',  audioText: 'lll'  },
      { sound: 'P',  audioText: 'puh'  },
    ],
    combined: 'HEH · LP',
    combinedAudio: 'help',
    referenceAudioSrc: null, // → '/audio/rohingya/lesson-emergency.m4a'
  },
];
