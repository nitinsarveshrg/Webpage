import React from 'react';

const SectionModeBanner = ({
  mode = 'SYSTEM_MODE',
  command = 'cat /proc/status',
  status = 'ACTIVE',
  tags = [],
  className = '',
}) => {
  return (
    <div className={`linux-mode-banner terminal-stagger-reveal ${className}`.trim()}>
      <div className="linux-mode-head">
        <div className="linux-mode-line">
          <span className="linux-mode-prompt">$</span>
          <span className="linux-mode-command">{command}</span>
        </div>
        <div className="linux-mode-state">
          <span className="linux-mode-dot" />
          <span>{status}</span>
        </div>
      </div>
      <div className="linux-mode-meta">
        <span className="linux-mode-label">{mode}</span>
        {tags.length > 0 && (
          <div className="linux-mode-tags">
            {tags.map((tag) => (
              <span key={tag} className="linux-mode-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionModeBanner;
