import React from "react";

function ProgressBar({ progressPercentage }) {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progressPercentage}%` }}
      >
        
      </div>
    </div>
  );
}

export default ProgressBar;