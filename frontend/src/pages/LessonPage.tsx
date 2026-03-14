import { useParams, useNavigate, Navigate } from 'react-router-dom';
import '../styles/lesson.css';
import { LESSON_CONTENT } from '../data/lessonContent';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import PhoneticBlock from '../components/learn/PhoneticBlock';
import MicButton from '../components/learn/MicButton';

const REFERENCE_AUDIO_ASSETS = import.meta.glob('../assets/*.{m4a,mp3,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function resolveReferenceAudio(title: string): string | null {
  const candidates = [
    `../assets/${title}.m4a`,
    `../assets/${title}.mp3`,
    `../assets/${title}.webm`,
  ];
  for (const path of candidates) {
    const asset = REFERENCE_AUDIO_ASSETS[path];
    if (typeof asset === 'string') return asset;
  }
  return null;
}

export default function LessonPage() {
  const { lessonId }  = useParams<{ lessonId: string }>();
  const navigate      = useNavigate();
  const { speak }     = useSpeechSynthesis();

  const lesson = LESSON_CONTENT.find((l) => l.id === lessonId);
  const lessonIndex = LESSON_CONTENT.findIndex((l) => l.id === lessonId);
  const nextLesson = lessonIndex >= 0 ? LESSON_CONTENT[lessonIndex + 1] : null;
  const resolvedReferenceAudio = lesson
    ? lesson.referenceAudioSrc ?? resolveReferenceAudio(lesson.title)
    : null;

  // Unknown lesson id → back to learn list
  if (!lesson) return <Navigate to="/learn" replace />;

  return (
    <main className="lesson-page">

      {/* ── Top row: back + lesson title ──────────────────────────── */}
      <div className="lesson-top-row">
        <button
          type="button"
          className="lesson-back-btn"
          onClick={() => navigate('/learn')}
          aria-label="Back to lessons"
        >
          ←
        </button>
        <h1 className="lesson-page-title">{lesson.title}</h1>
        {/* Spacer keeps the title visually centred */}
        <div className="lesson-top-row__spacer" aria-hidden="true" />
      </div>

      {/* ── 1. Lesson image ───────────────────────────────────────── */}
      <div className="lesson-image">
        {lesson.imageSrc ? (
          /*
           * TODO: When real illustration is ready, it loads automatically here.
           * Place file at /public/assets/<lessonId>.png and set imageSrc above.
           */
          <img
            src={lesson.imageSrc}
            alt={lesson.imageAlt}
            className="lesson-image__img"
          />
        ) : (
          /* Emoji fallback until illustration is added */
          <span
            className="lesson-image__emoji"
            role="img"
            aria-label={lesson.imageAlt}
          >
            {lesson.imageEmoji}
          </span>
        )}
      </div>

      {/* ── 2. Phonetic breakdown ─────────────────────────────────── */}
      <section className="lesson-phonetics" aria-label="Phonetic steps">
        <p className="lesson-section-hint">Sounds in this word:</p>
        {lesson.phonetics.map((step, i) => (
          <PhoneticBlock
            key={step.sound}
            sound={step.sound}
            audioText={step.audioText}
            index={i}
          />
        ))}
      </section>

      {/* ── 3. Combined word ──────────────────────────────────────── */}
      <div className="lesson-combined">
        <span className="lesson-combined__word">{lesson.combined}</span>
        <button
          type="button"
          className="lesson-combined__speak"
          onClick={() => speak(lesson.combinedAudio)}
          aria-label={`Hear the full word: ${lesson.title}`}
        >
          🔊
        </button>
      </div>

      {/* Label — English word below the phonetic spelling */}
      <p className="lesson-word-label">"{lesson.title}"</p>

      {/* ── 4. Microphone practice ────────────────────────────────── */}
      <MicButton
        expectedWord={lesson.title}
        referenceAudioSrc={resolvedReferenceAudio}
        onAdvance={() => {
          if (nextLesson) {
            navigate(`/learn/${nextLesson.id}`);
          } else {
            navigate('/learn');
          }
        }}
      />

    </main>
  );
}
