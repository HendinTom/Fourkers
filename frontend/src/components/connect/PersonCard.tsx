import type { MouseEvent } from 'react';
import type { Person, SpeakFn } from '../../types/connect';
import type { GeoCoords } from '../../hooks/useGeolocation';
import { getDistance, formatDistance } from '../../hooks/useGeolocation';

interface PersonCardProps {
  person: Person;
  speak: SpeakFn;
  userCoords: GeoCoords | null;
}

function spokenText(p: Person): string {
  return `${p.name}. Speaks ${p.languages.join(' and ')}. Located in ${p.city}. ${p.description}`;
}

export default function PersonCard({ person, speak, userCoords }: PersonCardProps) {
  const distance = userCoords ? getDistance(userCoords, person.coords) : null;
  const whatsappUrl = person.whatsapp
    ? `https://wa.me/${person.whatsapp.replace(/\D/g, '')}`
    : null;

  function handleWhatsAppFallback(e: MouseEvent<HTMLAnchorElement>) {
    if (!whatsappUrl) {
      e.preventDefault();
      speak('WhatsApp link will be added when the backend is connected.');
    }
  }

  return (
    <article className="person-card">
      <div className="person-card__top">
        <div
          className="avatar"
          style={{ background: `linear-gradient(135deg, ${person.avatar.from}, ${person.avatar.to})` }}
          aria-hidden="true"
        >
          {person.initials}
        </div>
        <div className="person-card__info">
          <h3 className="person-card__name">{person.name}</h3>
          <div className="lang-tags">
            {person.languages.map((lang) => (
              <span key={lang} className="lang-tag">{lang}</span>
            ))}
          </div>
          <p className="person-card__city">📍 {person.city}</p>
        </div>
        {distance !== null && (
          <span className="distance-badge">{formatDistance(distance)}</span>
        )}
      </div>
      <p className="person-card__desc">{person.description}</p>
      <div className="card-actions">
        <button
          type="button"
          className="card-btn card-btn--listen"
          onClick={() => speak(spokenText(person))}
          aria-label="Listen to this card"
        >
          🔊 Listen
        </button>
        <a
          href={whatsappUrl ?? '#'}
          className="card-btn card-btn--whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppFallback}
        >
          📱 WhatsApp
        </a>
      </div>
    </article>
  );
}
