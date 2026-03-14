import type { Lesson } from '../../data/lessons';
import type { SpeakFn } from '../../types/connect';

interface LessonCardProps {
  lesson: Lesson;
  speak: SpeakFn;
  index: number;
}

const STATUS_LABEL: Record<Lesson['status'], string> = {
  completed: 'Completed',
  next:      'Continue →',
  available: 'Start',
  locked:    'Locked',
};

export default function LessonCard({ lesson, speak, index }: LessonCardProps) {
  return (
    <article
      className={`lesson-card lesson-card--${lesson.status}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="lesson-card__icon-wrap" aria-hidden="true">
        {lesson.icon}
      </div>

      <div className="lesson-card__body">
        <h3 className="lesson-card__title">{lesson.title}</h3>
        <span className={`lesson-status-badge lesson-status-badge--${lesson.status}`}>
          {lesson.status === 'completed' && <span aria-hidden="true">✓ </span>}
          {STATUS_LABEL[lesson.status]}
        </span>
      </div>

      <button
        type="button"
        className="lesson-speak-btn"
        onClick={() => speak(lesson.narrationText)}
        aria-label={`Listen — ${lesson.title}`}
      >
        🔊
      </button>
    </article>
  );
}
