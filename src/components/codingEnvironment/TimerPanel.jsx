import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TimerPanel = () => {
    const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning && !isPaused && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, isPaused, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        setIsRunning(true);
        setIsPaused(false);
    };

    const pauseTimer = () => {
        setIsPaused(!isPaused);
    };

    const resetTimer = () => {
        setTimeLeft(45 * 60);
        setIsRunning(false);
        setIsPaused(false);
    };

    const getTimerColor = () => {
        if (timeLeft <= 5 * 60) return 'text-red-500'; // Last 5 minutes
        if (timeLeft <= 10 * 60) return 'text-yellow-500'; // Last 10 minutes
        return 'text-green-500';
    };

    return (
        <Card className="border-0 border-b rounded-none">
            <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Timer</CardTitle>
            </CardHeader>
            <CardContent className="py-3">
                <div className="text-center space-y-4">
                    <div className={`text-3xl font-mono font-bold ${getTimerColor()}`}>
                        {formatTime(timeLeft)}
                    </div>

                    <div className="flex justify-center space-x-2">
                        {!isRunning ? (
                            <Button size="sm" onClick={startTimer}>
                                Start
                            </Button>
                        ) : (
                            <Button size="sm" onClick={pauseTimer}>
                                {isPaused ? 'Resume' : 'Pause'}
                            </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={resetTimer}>
                            Reset
                        </Button>
                    </div>

                    {timeLeft === 0 && (
                        <div className="text-red-500 font-medium text-sm">
                            Time's up! ⏰
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TimerPanel; 