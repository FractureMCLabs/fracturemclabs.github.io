import React from 'react';

const Background = ({ site, children }) => {
  const backgroundClass = site ? `bg-site-${site}` : '';

  return (
    <div className={`${backgroundClass} h-full w-full`}>
      {children}
    </div>
  );
};

export default Background;
