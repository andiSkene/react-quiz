import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);

        //this cleanup function is run automatically before the timer is set
        return () => {
            clearTimeout(timer);
        }
    }
    
    , [timeout, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

        //this cleanup function is run automatically before the interval is set
        return () => {
            clearInterval(interval);
        }
    },[])

    return <progress id="question-time" max={timeout} value={remainingTime} className={mode} />;
}