import type { ActiveTab } from '../App';

interface NavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export default function Nav({ activeTab, onTabChange }: NavProps) {
  return (
    <nav className="nav" role="tablist" aria-label="Main navigation">
      <button
        type="button"
        role="tab"
        className={`nav-tab${activeTab === 'learning' ? ' nav-tab--active' : ''}`}
        aria-selected={activeTab === 'learning'}
        onClick={() => onTabChange('learning')}
      >
        <span className="nav-tab__icon" aria-hidden="true">📚</span>
        <span className="nav-tab__label">Learning</span>
      </button>
      <button
        type="button"
        role="tab"
        className={`nav-tab${activeTab === 'connect' ? ' nav-tab--active' : ''}`}
        aria-selected={activeTab === 'connect'}
        onClick={() => onTabChange('connect')}
      >
        <span className="nav-tab__icon" aria-hidden="true">🎤</span>
        <span className="nav-tab__label">Connect</span>
      </button>
    </nav>
  );
}
