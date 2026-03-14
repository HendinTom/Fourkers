import { useMemo } from 'react';
import type { SpeakFn } from '../../types/connect';
import type { GeoCoords } from '../../hooks/useGeolocation';
import { getDistance } from '../../hooks/useGeolocation';
import { LEADERS } from '../../data/leaders';
import LeaderCard from './LeaderCard';

interface LeadersSectionProps {
  speak: SpeakFn;
  activeLang: string;
  userCoords: GeoCoords | null;
  onBack: () => void;
}

export default function LeadersSection({
  speak,
  activeLang,
  userCoords,
  onBack,
}: LeadersSectionProps) {
  const leaders = useMemo(() => {
    // Backend: replace LEADERS with API call filtered by activeLang / userCoords
    let list = activeLang ? LEADERS.filter((l) => l.langCodes.includes(activeLang)) : LEADERS;
    if (userCoords) {
      list = [...list].sort(
        (a, b) => getDistance(userCoords, a.coords) - getDistance(userCoords, b.coords)
      );
    }
    return list;
  }, [activeLang, userCoords]);

  return (
    <section className="connect-section">
      <button type="button" className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <h2 className="section-title">Talk to a Leader 🤝</h2>
      <p className="section-subtitle">Trusted volunteers who can help with daily life</p>
      {leaders.length === 0 ? (
        <p className="empty-msg">No matches. Try "All" in the language filter.</p>
      ) : (
        <div className="card-list">
          {leaders.map((l) => (
            <LeaderCard key={l.id} leader={l} speak={speak} userCoords={userCoords} />
          ))}
        </div>
      )}
    </section>
  );
}
