import { useState, useEffect, useCallback } from 'react';

const useCount = (expiration: number = 300) => {
  const [expiresIn, setExpiresIn] = useState(expiration);

  useEffect(() => {
    if (expiresIn <= 0) return;

    const timer = setInterval(() => {
      setExpiresIn((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresIn]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = useCallback(() => {
    setExpiresIn(expiration);
  }, [expiration]);

  return { formatTime, expiresIn, reset };
};

export default useCount;
