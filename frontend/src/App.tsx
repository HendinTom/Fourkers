import { useState } from 'react';
import Nav from './components/Nav';
import LearningPage from './pages/LearningPage';
import ConnectPage from './pages/ConnectPage';

export type ActiveTab = 'learning' | 'connect';

export default function App() {
  const [tab, setTab] = useState<ActiveTab>('learning');

  return (
    <div className="app-shell">
      <Nav activeTab={tab} onTabChange={setTab} />
      <div className="app-body">
        {tab === 'learning' ? <LearningPage /> : <ConnectPage />}
      </div>
    </div>
  );
}
