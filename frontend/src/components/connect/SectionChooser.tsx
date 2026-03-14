import type { ConnectSection } from '../../types/connect';

interface SectionChooserProps {
  onSelect: (section: ConnectSection) => void;
}

const SECTIONS = [
  { id: 'people'  as const, icon: '👋', title: 'Meet People',       cls: 'section-card--people'  },
  { id: 'events'  as const, icon: '📅', title: 'Community Events',  cls: 'section-card--events'  },
  { id: 'leaders' as const, icon: '🤝', title: 'Talk to a Leader',  cls: 'section-card--leaders' },
];

export default function SectionChooser({ onSelect }: SectionChooserProps) {
  return (
    <div className="section-chooser" role="group" aria-label="What would you like to do?">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`section-card ${s.cls}`}
          onClick={() => onSelect(s.id)}
        >
          <span className="section-card__icon" aria-hidden="true">{s.icon}</span>
          <span className="section-card__title">{s.title}</span>
        </button>
      ))}
    </div>
  );
}
