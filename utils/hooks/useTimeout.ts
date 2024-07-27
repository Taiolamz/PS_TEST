import { useEffect, useState, useCallback } from 'react';

interface UseTimeoutProps {
  initialTime: number; // in seconds
}

const useTimeout = ({ initialTime }: UseTimeoutProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimerElapsed, setIsTimerElapsed] = useState(true);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (!isTimerElapsed && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsTimerElapsed(true);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timeLeft, isTimerElapsed]);

  const startTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsTimerElapsed(false);
  }, [initialTime]);

  return { timeLeft, startTimer, isTimerElapsed };
};

export default useTimeout;