"use client"; 

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CountdownTimer() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = () => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsDisable(false);
      setIsActive(false);

      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };

  const handleStartCountdown = () => {
    if (timeLeft > 0) {
      setIsDisable(false);
      setIsActive(true);
    }
  };

  const handlePauseCountdown = () => {
    if (isActive) {
      setIsActive(false);
      setIsDisable(true);
      { <h1>The Timer has been paused</h1> }
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };

  const handleResetCountdown = () => {
    setIsActive(false);
    setIsDisable(false);
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    setTimeLeft(0); 
  };

  useEffect(() => {
    if (isActive && !isDisable) {
      timeRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timeRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current!);
      }
    };
  }, [isActive, isDisable]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-purple-700 to-pink-500">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-10 w-full max-w-lg transform hover:scale-105 transition duration-500 ease-in-out">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 text-center tracking-wider">
          Countdown Timer
        </h1>
  
        <div className="flex items-center mb-8">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-lg border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 transition rounded-lg shadow-md"
          >
            Set
          </Button>
        </div>
  
        <div className="text-7xl font-extrabold text-gray-800 dark:text-gray-100 mb-10 text-center tracking-widest">
          {formatTime(timeLeft)}
        </div>
  
        <div className="flex justify-center gap-6">
          <Button
            onClick={handleStartCountdown}
            variant="outline"
            className="bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600 transition rounded-lg shadow-md"
          >
            {isDisable ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePauseCountdown}
            variant="outline"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 transition rounded-lg shadow-md"
          >
            Pause
          </Button>
          <Button
            onClick={handleResetCountdown}
            variant="outline"
            className="bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600 transition rounded-lg shadow-md"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}