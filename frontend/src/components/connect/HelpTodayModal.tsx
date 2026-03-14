interface HelpTodayModalProps {
  onClose: () => void;
}

export default function HelpTodayModal({ onClose }: HelpTodayModalProps) {
  return (
    <div
      className="modal-overlay modal-overlay--urgent"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="I need help today"
    >
      <div className="modal-sheet modal-sheet--urgent" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🆘 I need help today</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">
          <p className="help-intro">If you need urgent support, contact one of these:</p>
          <ul className="help-list">
            <li>
              <span className="help-list__label">24/7 crisis line</span>
              {/* Backend: replace with real crisis line number */}
              <a href="tel:18009339955" className="help-list__link">1-800-933-9955</a>
            </li>
            <li>
              <span className="help-list__label">Newcomer helpline</span>
              {/* Backend: replace with real newcomer service line */}
              <a href="tel:18009209675" className="help-list__link">1-800-920-9675</a>
            </li>
            <li>
              <span className="help-list__label">Emergency services</span>
              <a href="tel:911" className="help-list__link help-list__link--emergency">Call 911</a>
            </li>
          </ul>
          <p className="help-note">
            Community leaders on this app can also help quickly. Find them on the "Talk to a
            Leader" page and tap WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
