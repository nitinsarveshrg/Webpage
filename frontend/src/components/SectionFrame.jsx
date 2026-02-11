import React from 'react';

const SectionFrame = ({ path, label, children, className = '', bodyClassName = '' }) => {
  return (
    <div className={`neo-shell ${className}`.trim()}>
      <div className="neo-shell-top">
        <div className="neo-shell-signals" aria-hidden="true">
          <span className="neo-shell-dot neo-shell-dot-red" />
          <span className="neo-shell-dot neo-shell-dot-amber" />
          <span className="neo-shell-dot neo-shell-dot-lime" />
        </div>
        <div className="neo-shell-path">{path}</div>
        <div className="neo-shell-label">{label}</div>
      </div>
      <div className={`neo-shell-body ${bodyClassName}`.trim()}>{children}</div>
    </div>
  );
};

export default SectionFrame;
