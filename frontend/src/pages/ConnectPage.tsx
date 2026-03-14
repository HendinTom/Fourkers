import { useState, useMemo, useCallback } from 'react';
import '../styles/connect.css';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useGeolocation } from '../hooks/useGeolocation';
import AssistantBar from '../components/connect/AssistantBar';
import SectionChooser from '../components/connect/SectionChooser';
import PeopleSection from '../components/connect/PeopleSection';
import EventsSection from '../components/connect/EventsSection';
import EventsModal from '../components/connect/EventsModal';
import LeadersSection from '../components/connect/LeadersSection';
import HelpTodayModal from '../components/connect/HelpTodayModal';
import { LANG_FILTERS } from '../types/connect';
import type { ConnectSection } from '../types/connect';

// Full spoken prompts — heard when user taps 🔊, not auto-played
const PROMPTS: Record<string, string> = {
  home: 'Meet people near you. Find community events. Or talk to a community leader. Tap an option, or use your voice.',
  people: 'These are newcomers near you. They speak your language. Tap the speaker button on any card to hear about them.',
  events: 'Community events near you. Tap the speaker button on any event to hear more about it.',
  leaders: 'Trusted community leaders. Tap the speaker button on any card to hear how they can help you.',
};

export default function ConnectPage() {
  const [section, setSection] = useState<ConnectSection>(null);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('');

  // No auto-speak: browser blocks audio before a user gesture.
  // The 🔊 button in AssistantBar is the user's trigger.
  const { speak, supported: ttsSupported } = useSpeechSynthesis();
  const { coords } = useGeolocation();

  const prompt = useMemo((): string => {
    if (section === 'people')  return PROMPTS['people'];
    if (section === 'events')  return PROMPTS['events'];
    if (section === 'leaders') return PROMPTS['leaders'];
    return PROMPTS['home'];
  }, [section]);

  const handleSectionSelect = useCallback((s: ConnectSection): void => {
    setSection(s);
    setEventsOpen(false);
  }, []);

  const handleBack = useCallback((): void => {
    setSection(null);
    setEventsOpen(false);
  }, []);

  return (
    <div className="connect-page">
      <header className="connect-header">
        <h1 className="connect-title">Connect 🌍</h1>
      </header>

      <AssistantBar
        text={prompt}
        speak={speak}
        ttsSupported={ttsSupported}
        onSectionSelect={handleSectionSelect}
      />

      {section !== null && (
        <div className="lang-filters" role="group" aria-label="Filter by language">
          {LANG_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`lang-chip${activeLang === f.id ? ' lang-chip--active' : ''}`}
              onClick={() => setActiveLang(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="connect-content">
        {section === null && <SectionChooser onSelect={handleSectionSelect} />}
        {section === 'people' && (
          <PeopleSection
            speak={speak}
            activeLang={activeLang}
            userCoords={coords}
            onBack={handleBack}
          />
        )}
        {section === 'events' && (
          <EventsSection onOpenModal={() => setEventsOpen(true)} onBack={handleBack} />
        )}
        {section === 'leaders' && (
          <LeadersSection
            speak={speak}
            activeLang={activeLang}
            userCoords={coords}
            onBack={handleBack}
          />
        )}
      </div>

      {eventsOpen && (
        <EventsModal speak={speak} onClose={() => setEventsOpen(false)} userCoords={coords} />
      )}

      {helpOpen && <HelpTodayModal onClose={() => setHelpOpen(false)} />}

      <div className="connect-footer">
        <button type="button" className="help-today-btn" onClick={() => setHelpOpen(true)}>
          🆘 I need help today
        </button>
      </div>
    </div>
  );
}
