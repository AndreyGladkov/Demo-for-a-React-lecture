import { useCallback, useEffect, useState } from 'react';

export const useCountdown = (seconds: number): [secondsLeft: number, restart: () => void] => {
    const [secondsLeft, setSecondsLeft] = useState(seconds);
    const [round, setRound] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setSecondsLeft((left) => Math.max(0, left - 1)), 1000);
        return () => clearInterval(timer);
    }, [round]);

    const restart = useCallback(() => {
        setSecondsLeft(seconds);
        setRound((value) => value + 1);
    }, [seconds]);

    return [secondsLeft, restart];
};
