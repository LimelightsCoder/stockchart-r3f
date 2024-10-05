'use client'
import React, { useEffect, useState } from 'react';

const CurrentTime = () => {
  const [currentDate, setCurrentDate] = useState('');

  // Function to update the current date
  const updateCurrentDate = () => {
    const date = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles', // Set to Los Angeles time zone
      hour: 'numeric',                 // Show hour
      minute: 'numeric',               // Show minutes
      //second: 'numeric',               // Show seconds (optional)
      //hour12: true                     // Set to true for 12-hour format
    });
    setCurrentDate(date);
  };

  // Update the time every second
  useEffect(() => {
    updateCurrentDate(); // Initial call to set the time
    const intervalId = setInterval(updateCurrentDate, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p className="mt-2 text-[2.25vw] text-[#bbbbbb] pointer-events-none select-none">{new Date().getFullYear()}</p>
      <p className="mt-2 text-[2.25vw] text-[#bbbbbb] pointer-events-none select-none">{currentDate}</p>
    </div>
  );
};

export default CurrentTime;
