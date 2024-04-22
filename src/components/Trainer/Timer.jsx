import React, { useState, useEffect, useRef } from "react";
import formatTime from "../../util/formatTime";

const Timer = ({ runTimer, setTime, time }) => {
    const timerId = useRef();

    useEffect(() => {
        if (runTimer) {
            setTime(0);
            timerId.current = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 10);
        } else {
            clearInterval(timerId.current);
        }
        return () => {
            clearInterval(timerId.current);
        };
    }, [runTimer]);

    return <h1 className="text-8xl">{formatTime(time)}</h1>;
};

export default Timer;
