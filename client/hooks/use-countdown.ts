import { useEffect, useMemo, useRef, useState } from "react";

export function useCountdown(totalSeconds: number, onExpire?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(timerRef.current!);
          onExpire?.();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [onExpire]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  const progress = useMemo(() => (
    ((totalSeconds - secondsLeft) / totalSeconds) * 100
  ), [secondsLeft, totalSeconds]);

  return { secondsLeft, display: `${minutes}:${seconds}`, progress };
}
