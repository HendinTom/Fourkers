import { useState, useEffect, useMemo, useCallback } from 'react';
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

const PROMPTS: Record<string, string> = {
  home: 'Would you like to meet people, find community events, or talk to a leader? Tap an option or use your voice.',
  people:
    'Here are newcomers near you. They speak your language and can help. Tap a card to hear more, or tap WhatsApp to message them.',
  events:
    'These are community events near you. Join walks, classes, and more. Tap an event to hear about it or get help going.',
  leaders:
    'These are trusted community leaders. They can help with daily life, services, and more. Tap to hear about them or message them.',
};

export default function ConnectPage() {
  const [section, setSection] = useState<ConnectSection>(null);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('');

  const { speak, cancel, supported: ttsSupported } = useSpeechSynthesis();
  const { coords } = useGeolocation();

  const prompt = useMemo((): string => {
    if (section === 'people') return PROMPTS['people'];
    if (section === 'events') return PROMPTS['events'];
    if (section === 'leaders') return PROMPTS['leaders'];
    return PROMPTS['home'];
  }, [section]);

  // Speak the prompt whenever the section changes (with a brief startup delay)
  useEffect(() => {
    const timer = setTimeout(() => speak(prompt), 500);
    return () => {
      clearTimeout(timer);
      cancel();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <p className="connect-subtitle">Find friends, events, and help nearby</p>
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

      {/* Fixed bottom bar — always visible */}
      <div className="connect-footer">
        <button type="button" className="help-today-btn" onClick={() => setHelpOpen(true)}>
          🆘 I need help today
        </button>
      </div>
    </div>
  );
}
