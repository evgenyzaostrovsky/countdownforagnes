import {useEffect, useState} from "react";
import s from './Countdown.module.css'

export const Countdown = () => {
    const targetDate = "2025-07-06T16:15:00"
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        if (difference <= 0) return null;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


    useEffect(() => {
        const timer = setInterval(() => {
            const updatedTime = calculateTimeLeft();
            setTimeLeft(updatedTime);
            if (!updatedTime) clearInterval(timer);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return <div>Время вышло!</div>;

    return (
        <div className={s.countdown}>
            <div className={s.data}>{timeLeft.days} days</div>
            <div className={s.data}> {timeLeft.hours} hours </div>
            <div className={s.data}>{timeLeft.minutes} minutes </div>
           <div className={s.data}> {timeLeft.seconds} seconds</div>
        </div>
    );
}


