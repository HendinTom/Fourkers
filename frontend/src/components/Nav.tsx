import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/learn',   icon: '📚', label: 'Learning' },
  { path: '/connect', icon: '🌍', label: 'Connect'  },
] as const;

export default function Nav() {
  const location  = useLocation();
  const navigate  = useNavigate();

  // Treat /learn and /learn/:id as the same active tab
  const activeBase = location.pathname.startsWith('/connect') ? '/connect' : '/learn';

  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar-brand">
        <span className="sidebar-brand__logo" aria-hidden="true">🤝</span>
        <span className="sidebar-brand__name">Fourkers</span>
      </div>

      <div className="sidebar-nav" role="tablist">
        {NAV_ITEMS.map(({ path, icon, label }) => (
          <button
            key={path}
            type="button"
            role="tab"
            aria-selected={activeBase === path}
            className={`sidebar-item${activeBase === path ? ' sidebar-item--active' : ''}`}
            onClick={() => navigate(path)}
          >
            <span className="sidebar-item__icon" aria-hidden="true">{icon}</span>
            <span className="sidebar-item__label">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
