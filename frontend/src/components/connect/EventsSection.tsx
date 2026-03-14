interface EventsSectionProps {
  onOpenModal: () => void;
  onBack: () => void;
}

const PREVIEWS = [
  { emoji: '🚌', label: 'Bus tour' },
  { emoji: '🌳', label: 'English walk' },
  { emoji: '🌸', label: 'Support circle' },
  { emoji: '🍲', label: 'Community kitchen' },
];

export default function EventsSection({ onOpenModal, onBack }: EventsSectionProps) {
  return (
    <section className="connect-section events-hero-section">
      <button type="button" className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <h2 className="section-title">Community Events 📅</h2>
      <p className="section-subtitle">Walks, classes, and more near you</p>
      <div className="events-preview-grid">
        {PREVIEWS.map((p) => (
          <div key={p.label} className="events-preview-tile">
            <span className="events-preview-tile__emoji" aria-hidden="true">{p.emoji}</span>
            <span className="events-preview-tile__label">{p.label}</span>
          </div>
        ))}
      </div>
      <button type="button" className="cta-btn" onClick={onOpenModal}>
        See all events
      </button>
    </section>
  );
}
