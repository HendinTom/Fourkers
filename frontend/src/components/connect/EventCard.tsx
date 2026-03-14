import type { CommunityEvent, SpeakFn } from '../../types/connect';
import type { GeoCoords } from '../../hooks/useGeolocation';
import { getDistance, formatDistance } from '../../hooks/useGeolocation';

interface EventCardProps {
  event: CommunityEvent;
  speak: SpeakFn;
  userCoords: GeoCoords | null;
}

function spokenText(e: CommunityEvent): string {
  return `${e.title}. At ${e.location}. ${e.dateTime}. ${e.description}`;
}

export default function EventCard({ event, speak, userCoords }: EventCardProps) {
  const distance = userCoords ? getDistance(userCoords, event.coords) : null;

  return (
    <article className="event-card">
      <div className="event-card__emoji" aria-hidden="true">{event.emoji}</div>
      <div className="event-card__body">
        <div className="event-card__header">
          <h3 className="event-card__title">{event.title}</h3>
          {distance !== null && (
            <span className="distance-badge">{formatDistance(distance)}</span>
          )}
        </div>
        <p className="event-card__meta">
          📍 {event.location} · 🕐 {event.dateTime}
        </p>
        <p className="event-card__desc">{event.description}</p>
        <div className="card-actions">
          <button
            type="button"
            className="card-btn card-btn--listen"
            onClick={() => speak(spokenText(event))}
            aria-label="Listen to this event"
          >
            🔊 Listen
          </button>
          <button
            type="button"
            className="card-btn card-btn--primary"
            onClick={() =>
              speak(
                'A community leader can help you get to this event. We will connect you when the backend is ready.'
              )
            }
          >
            Get help going
          </button>
          <button
            type="button"
            className="card-btn card-btn--secondary"
            onClick={() => speak('We will remind you about this event when reminders are connected.')}
          >
            Remind me
          </button>
        </div>
      </div>
    </article>
  );
}
