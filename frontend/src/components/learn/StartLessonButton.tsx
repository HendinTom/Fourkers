interface StartLessonButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Large visual "start lesson" button.
 * Designed for non-literate users — no text label ON the button.
 * A bold ▶ play symbol is the entire message.
 */
export default function StartLessonButton({
  onClick,
  disabled = false,
}: StartLessonButtonProps) {
  return (
    <div className="start-btn-wrap">
      <button
        type="button"
        className="start-lesson-btn"
        onClick={onClick}
        disabled={disabled}
        aria-label="Start lesson"
      >
        {/* ▶ — universally understood "play / start" symbol */}
        <span className="start-lesson-btn__icon" aria-hidden="true">
          ▶
        </span>
      </button>
      {/* Small helper label below the button for users who can read */}
      <p className="start-btn-hint" aria-hidden="true">
        Tap to begin
      </p>
    </div>
  );
}
