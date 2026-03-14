import { useMemo } from 'react';
import type { SpeakFn } from '../../types/connect';
import type { GeoCoords } from '../../hooks/useGeolocation';
import { getDistance } from '../../hooks/useGeolocation';
import { EVENTS } from '../../data/events';
import EventCard from './EventCard';

interface EventsModalProps {
  speak: SpeakFn;
  onClose: () => void;
  userCoords: GeoCoords | null;
}

export default function EventsModal({ speak, onClose, userCoords }: EventsModalProps) {
  const events = useMemo(() => {
    // Backend: replace EVENTS with API response filtered/sorted server-side
    if (!userCoords) return EVENTS;
    return [...EVENTS].sort(
      (a, b) => getDistance(userCoords, a.coords) - getDistance(userCoords, b.coords)
    );
  }, [userCoords]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Community events"
    >
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Community Events 📅</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close events"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {events.map((event) => (
            <EventCard key={event.id} event={event} speak={speak} userCoords={userCoords} />
          ))}
        </div>
      </div>
    </div>
  );
}
