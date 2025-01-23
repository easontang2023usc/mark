import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const pstDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    const hours = pstDate.getHours();
    const minutes = pstDate.getMinutes();
    const seconds = pstDate.getSeconds();
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds} PST`;
  };

  return (
    <div className="font-medium text-2xl mb-10">
      {formatTime(time)}
    </div>
  );
};

export default Clock;