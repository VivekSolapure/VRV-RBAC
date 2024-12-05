import React from 'react';

function Step({ number, title, description }) {
  return (
    <div className="step">
      <div className="step-number">{number}</div>
      <div className="step-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Step;