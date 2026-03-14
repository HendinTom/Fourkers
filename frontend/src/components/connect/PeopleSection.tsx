import { useMemo } from 'react';
import type { SpeakFn } from '../../types/connect';
import type { GeoCoords } from '../../hooks/useGeolocation';
import { getDistance } from '../../hooks/useGeolocation';
import { PEOPLE } from '../../data/people';
import PersonCard from './PersonCard';

interface PeopleSectionProps {
  speak: SpeakFn;
  activeLang: string;
  userCoords: GeoCoords | null;
  onBack: () => void;
}

export default function PeopleSection({ speak, activeLang, userCoords, onBack }: PeopleSectionProps) {
  const people = useMemo(() => {
    // Backend: replace PEOPLE with API call filtered by activeLang / userCoords
    let list = activeLang ? PEOPLE.filter((p) => p.langCodes.includes(activeLang)) : PEOPLE;
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
      <h2 className="section-title">Meet People 👋</h2>
      <p className="section-subtitle">Newcomers near you who speak your language</p>
      {people.length === 0 ? (
        <p className="empty-msg">No matches. Try "All" in the language filter.</p>
      ) : (
        <div className="card-list">
          {people.map((p) => (
            <PersonCard key={p.id} person={p} speak={speak} userCoords={userCoords} />
          ))}
        </div>
      )}
    </section>
  );
}
