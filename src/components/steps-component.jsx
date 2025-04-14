// StepsComponent.js
import React from "react";

function StepsComponent({ currentPage, totalPages }) {
  const steps = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="py-4 stepsComponentMainDiv">
      <div className="row">
        {steps.map((step) => (
          <div key={step} className="col text-center">
            {step < currentPage ? (
              <div className="d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#2f88ff"
                    d="m21.29 5.89l-10 10a.996.996 0 0 1-1.41 0l-2.83-2.83a.996.996 0 1 1 1.41-1.41l2.12 2.12l9.29-9.29a.996.996 0 0 1 1.41 0c.4.39.4 1.02.01 1.41m-5.52-3.15c-1.69-.69-3.61-.93-5.61-.57c-4.07.73-7.32 4.01-8.01 8.08a10.009 10.009 0 0 0 11.19 11.66c3.96-.51 7.28-3.46 8.32-7.31c.4-1.47.44-2.89.21-4.22c-.13-.8-1.12-1.11-1.7-.54c-.23.23-.33.57-.27.89c.22 1.33.12 2.75-.52 4.26c-1.16 2.71-3.68 4.7-6.61 4.97c-5.1.47-9.33-3.85-8.7-8.98c.43-3.54 3.28-6.42 6.81-6.91c1.73-.24 3.37.09 4.77.81a1.003 1.003 0 0 0 .93-1.78c-.27-.12-.54-.25-.81-.36"
                  />
                </svg>
                <p className="steps">Step {step}</p>
              </div>
            ) : step === currentPage ? (
              <div className="d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 48 48"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="#2f88ff"
                    stroke="#fff"
                    strokeWidth="4"
                  />
                </svg>
                <p className="steps">Step {step}</p>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#a3a3a3"
                      d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12"
                    />
                  </g>
                </svg>
                <p className="steps">Step {step}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepsComponent;
