import { useState, useEffect } from 'react';

const useCount = (expiration: number = 300) => {
  const [expiresIn, setExpiresIn] = useState(expiration);

  useEffect(() => {
    const timer = setInterval(() => {
      setExpiresIn((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return { formatTime, expiresIn };
};

export default useCount;
