import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/learn.css';
import { AUDIO_GUIDE } from '../data/audioGuide';
import { LESSONS, COMPLETED_LESSONS, TOTAL_LESSONS, PROGRESS_PCT } from '../data/lessons';
import AudioHelpButton from '../components/learn/AudioHelpButton';
import StartLessonButton from '../components/learn/StartLessonButton';
import LessonDropdown from '../components/learn/LessonDropdown';
import { useRohingyaAudio } from '../hooks/useRohingyaAudio';

export default function LearningPage() {
  const navigate = useNavigate();

  // Default to the lesson marked 'next'; fall back to first lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(
    () => LESSONS.find((l) => l.status === 'next')?.id ?? LESSONS[0].id
  );

  const activeLesson = LESSONS.find((l) => l.id === activeLessonId) ?? LESSONS[0];
  const { play: playRohingya } = useRohingyaAudio();

  function handleStartLesson(): void {
    // Play the lesson's Rohingya intro audio, then navigate to the detail page
    playRohingya(activeLesson.lessonIntroEntry);
    navigate(`/learn/${activeLesson.id}`);
  }

  function handleDropdownSelect(id: string): void {
    setActiveLessonId(id);
    // Navigate directly to the lesson when chosen from the dropdown
    navigate(`/learn/${id}`);
  }

  return (
    <main className="learn-page">

      {/* ── 1. Header row: title + page-guide audio ───────────────────── */}
      <div className="learn-header-row">
        <h1 className="learn-title">Learn 📚</h1>
        <AudioHelpButton
          entry={AUDIO_GUIDE.pageGuide}
          size="md"
          className="learn-header-audio"
        />
      </div>
      <p className="learn-subtitle">Build skills for life in Toronto</p>

      {/* ── 2. Active lesson hero card + large Start button ──────────── */}
      <div className="learn-hero-card">
        {/* Lesson icon — big visual cue for non-literate users */}
        <div className="learn-hero-card__icon" aria-hidden="true">
          {activeLesson.icon}
        </div>
        <p className="learn-hero-card__title">{activeLesson.title}</p>

        {/* ▶ Start button — the most prominent element on the page */}
        <StartLessonButton onClick={handleStartLesson} />

        {/* Per-lesson audio help — explains what this lesson is about */}
        <AudioHelpButton
          entry={activeLesson.cardHelpEntry}
          size="sm"
          className="learn-hero-card__audio"
        />
      </div>

      {/* ── 3. Progress bar ──────────────────────────────────────────── */}
      <div className="learn-progress-section">
        <div className="learn-progress-header">
          <span className="learn-progress-label">
            {COMPLETED_LESSONS} of {TOTAL_LESSONS} lessons done
          </span>
          <AudioHelpButton entry={AUDIO_GUIDE.progressGuide} size="sm" />
        </div>
        <div
          className="learn-progress-track"
          role="progressbar"
          aria-valuenow={PROGRESS_PCT}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Lesson progress"
        >
          <div className="learn-progress-fill" style={{ width: `${PROGRESS_PCT}%` }} />
        </div>
      </div>

      {/* ── 4. "More lessons" selector ───────────────────────────────── */}
      <div className="learn-lessons-row">
        <span className="learn-section-title">All lessons</span>
        <AudioHelpButton entry={AUDIO_GUIDE.lessonsGuide} size="sm" />
      </div>
      <LessonDropdown
        lessons={LESSONS}
        activeLessonId={activeLessonId}
        onSelect={handleDropdownSelect}
      />

    </main>
  );
}
