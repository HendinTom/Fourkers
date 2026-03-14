import { useState } from 'react';
import type { Lesson } from '../../data/lessons';

interface LessonDropdownProps {
  lessons: Lesson[];
  activeLessonId: string;
  onSelect: (id: string) => void;
}

const STATUS_ICON: Record<Lesson['status'], string> = {
  completed: '✓',
  next:      '▶',
  available: '○',
  locked:    '🔒',
};

/**
 * "More lessons" trigger + bottom-sheet lesson selector.
 * Opens a simple scrollable sheet so the user can pick a different lesson.
 */
export default function LessonDropdown({
  lessons,
  activeLessonId,
  onSelect,
}: LessonDropdownProps) {
  const [open, setOpen] = useState(false);

  function handleSelect(lesson: Lesson) {
    if (lesson.status === 'locked') return;
    onSelect(lesson.id);
    setOpen(false);
  }

  return (
    <>
      {/* ── Trigger button ───────────────────────────────────────────── */}
      <button
        type="button"
        className="more-lessons-btn"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className="more-lessons-btn__icon" aria-hidden="true">📋</span>
        <span className="more-lessons-btn__label">More lessons</span>
        <span className="more-lessons-btn__arrow" aria-hidden="true">▼</span>
      </button>

      {/* ── Bottom-sheet overlay ────────────────────────────────────── */}
      {open && (
        <div
          className="lesson-sheet-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Choose a lesson"
          onClick={() => setOpen(false)}
        >
          <div
            className="lesson-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="lesson-sheet__header">
              <span className="lesson-sheet__title">All Lessons</span>
              <button
                type="button"
                className="lesson-sheet__close"
                onClick={() => setOpen(false)}
                aria-label="Close lesson list"
              >
                ✕
              </button>
            </div>

            {/* Lesson list */}
            <div className="lesson-sheet__list">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  className={[
                    'lesson-choice',
                    lesson.id === activeLessonId ? 'lesson-choice--active' : '',
                    lesson.status === 'locked'   ? 'lesson-choice--locked' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleSelect(lesson)}
                  disabled={lesson.status === 'locked'}
                  aria-current={lesson.id === activeLessonId ? 'true' : undefined}
                >
                  <span className="lesson-choice__icon" aria-hidden="true">
                    {lesson.icon}
                  </span>
                  <span className="lesson-choice__title">{lesson.title}</span>
                  <span
                    className={`lesson-choice__status lesson-choice__status--${lesson.status}`}
                    aria-label={lesson.status}
                  >
                    {STATUS_ICON[lesson.status]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
