const TOPICS = [
  {
    id: 'transit',
    icon: '🚌',
    title: 'Toronto transit & bus',
    desc: 'How to use buses, streetcars, and subway. Fares, routes, and planning your trip.',
  },
  {
    id: 'english',
    icon: '🗣️',
    title: 'English everyday',
    desc: 'Common phrases, directions, and vocabulary for daily life.',
  },
  {
    id: 'housing',
    icon: '🏠',
    title: 'Housing & rights',
    desc: 'Renting, tenant rights, and finding support in Toronto.',
  },
  {
    id: 'health',
    icon: '🏥',
    title: 'Health & services',
    desc: 'Clinics, OHIP, and how to access healthcare.',
  },
];

export default function LearningPage() {
  return (
    <main className="learning-page">
      <header className="page-header">
        <h1>Learn 📚</h1>
        <p>Topics to help you in daily life</p>
      </header>
      <div className="topic-grid">
        {TOPICS.map((topic) => (
          <article key={topic.id} className="topic-card">
            <span className="topic-card__icon" aria-hidden="true">{topic.icon}</span>
            <h2 className="topic-card__title">{topic.title}</h2>
            <p className="topic-card__desc">{topic.desc}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
