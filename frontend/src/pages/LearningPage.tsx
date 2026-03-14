const TOPICS = [
  { id: 'transit', icon: '🚌', title: 'Toronto transit & bus' },
  { id: 'english', icon: '🗣️', title: 'English everyday'       },
  { id: 'housing', icon: '🏠', title: 'Housing & rights'       },
  { id: 'health',  icon: '🏥', title: 'Health & services'      },
];

export default function LearningPage() {
  return (
    <main className="learning-page">
      <header className="page-header">
        <h1>Learn 📚</h1>
      </header>
      <div className="topic-grid">
        {TOPICS.map((topic) => (
          <article key={topic.id} className="topic-card">
            <span className="topic-card__icon" aria-hidden="true">{topic.icon}</span>
            <h2 className="topic-card__title">{topic.title}</h2>
          </article>
        ))}
      </div>
    </main>
  );
}
