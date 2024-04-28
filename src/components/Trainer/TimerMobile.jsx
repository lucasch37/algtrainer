import React, { useState, useEffect, useRef } from "react";
import formatTime from "../../util/formatTime";

const TimerMobile = ({ runTimer, setTime, time }) => {
    const timerId = useRef();

    useEffect(() => {
        if (runTimer) {
            setTime(0);
            timerId.current = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 100);
        } else {
            clearInterval(timerId.current);
        }
        return () => {
            clearInterval(timerId.current);
        };
    }, [runTimer]);

    return <h1>{formatTime(time)}</h1>;
};

export default TimerMobile;
