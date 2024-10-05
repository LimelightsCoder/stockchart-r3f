import React from 'react';

const CurrentTime = () => {
  // Get the current date in PST
  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles', // Set to Los Angeles time zone
    hour: 'numeric',                 // Show hour
    minute: 'numeric',               // Show minutes
    //second: 'numeric',               // Show seconds (optional)
    //hour12: true                     // Set to true for 12-hour format
  });

  return (
    <div>
      <p className="mt-2 text-[2.25vw] text-[#bbbbbb] pointer-events-none select-none">{new Date().getFullYear()}</p>
      <p className="mt-2 text-[2.25vw] text-[#bbbbbb] pointer-events-none select-none">{currentDate}</p>
    </div>
  );
};

export default CurrentTime;
