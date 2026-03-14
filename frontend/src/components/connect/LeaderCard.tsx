import type { MouseEvent } from 'react';
import type { Leader, SpeakFn } from '../../types/connect';
import type { GeoCoords } from '../../hooks/useGeolocation';
import { getDistance, formatDistance } from '../../hooks/useGeolocation';

interface LeaderCardProps {
  leader: Leader;
  speak: SpeakFn;
  userCoords: GeoCoords | null;
}

function spokenText(l: Leader): string {
  return `${l.name}. ${l.role}. Speaks ${l.languages.join(' and ')}. ${l.helpOffered}`;
}

export default function LeaderCard({ leader, speak, userCoords }: LeaderCardProps) {
  const distance = userCoords ? getDistance(userCoords, leader.coords) : null;
  const whatsappUrl = leader.whatsapp
    ? `https://wa.me/${leader.whatsapp.replace(/\D/g, '')}`
    : null;

  function handleWhatsAppFallback(e: MouseEvent<HTMLAnchorElement>) {
    if (!whatsappUrl) {
      e.preventDefault();
      speak('WhatsApp link will be added when the backend is connected.');
    }
  }

  return (
    <article className="leader-card">
      <button
        type="button"
        className="card-speak-btn"
        onClick={() => speak(spokenText(leader))}
        aria-label={`Listen — ${leader.name}`}
      >
        🔊
      </button>
      {leader.verified && (
        <span className="trusted-badge">✓ Trusted</span>
      )}
      <div className="leader-card__top">
        <div
          className="avatar"
          style={{ background: `linear-gradient(135deg, ${leader.avatar.from}, ${leader.avatar.to})` }}
          aria-hidden="true"
        >
          {leader.initials}
        </div>
        <div className="leader-card__info">
          <h3 className="leader-card__name">{leader.name}</h3>
          <p className="leader-card__role">{leader.role}</p>
          <div className="lang-tags">
            {leader.languages.map((lang) => (
              <span key={lang} className="lang-tag">{lang}</span>
            ))}
          </div>
          {distance !== null && (
            <span className="distance-badge">{formatDistance(distance)}</span>
          )}
        </div>
      </div>
      <div className="card-actions">
        <a
          href={whatsappUrl ?? '#'}
          className="card-btn card-btn--whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppFallback}
        >
          📱 WhatsApp
        </a>
        <button
          type="button"
          className="card-btn card-btn--primary"
          onClick={() =>
            speak('Your request for a call has been noted. The leader will contact you.')
          }
        >
          📞 Call
        </button>
      </div>
    </article>
  );
}
