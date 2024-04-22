import React, { useEffect, useState } from "react";
import formatTime from "../../util/formatTime";

const StatsPanel = ({ times }) => {
    const [ao5, setAo5] = useState();
    const [bestAo5, setBestAo5] = useState();
    const [ao12, setAo12] = useState();
    const [bestAo12, setBestAo12] = useState();

    const calculateAvg = (lastTimes, divideBy) => {
        lastTimes.splice(lastTimes.indexOf(Math.min(...lastTimes)), 1);
        lastTimes.splice(lastTimes.indexOf(Math.max(...lastTimes)), 1);
        const avg = lastTimes.reduce((sum, val) => sum + val, 0) / divideBy;
        return avg;
    };

    const calculateBestAo5 = () => {
        let lowest = calculateAvg(
            times.slice(-5).map((time) => time.time),
            3
        );
        for (let i = 0; i < times.length - 5; i++) {
            let avg = calculateAvg(
                times.slice(i, i + 5).map((time) => time.time),
                3
            );
            if (avg < lowest) {
                lowest = avg;
            }
        }
        return lowest;
    };

    const calculateBestAo12 = () => {
        let lowest = calculateAvg(
            times.slice(-12).map((time) => time.time),
            10
        );
        for (let i = 0; i < times.length - 12; i++) {
            let avg = calculateAvg(
                times.slice(i, i + 12).map((time) => time.time),
                10
            );
            if (avg < lowest) {
                lowest = avg;
            }
        }
        return lowest;
    };

    useEffect(() => {
        if (times.length >= 5) {
            setAo5(
                calculateAvg(
                    times.slice(-5).map((time) => time.time),
                    3
                ).toFixed(0)
            );
            setBestAo5(calculateBestAo5().toFixed(0));
        }
        if (times.length >= 12) {
            setAo12(
                calculateAvg(
                    times.slice(-12).map((time) => time.time),
                    10
                ).toFixed(0)
            );
            setBestAo12(calculateBestAo12().toFixed(0));
        }
    }, [times]);

    return (
        <div className="h-[48.5%] bg-gray-700 rounded-xl overflow-hidden flex flex-col ">
            <div className="flex justify-center font-semibold text-xl bg-gray-800 p-1 items-center">
                Stats
            </div>
            <div className="flex flex-col flex-grow items-center">
                <table className="text-center border-separate border-spacing-2 w-5/6 h-5/6">
                    <thead>
                        <tr className="h-0">
                            <th className=""></th>
                            <th className="w-2/5">Current</th>
                            <th className="w-2/5">Best</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font-bold">Time</td>
                            <td className="bg-gray-400 rounded-lg">
                                {times.length > 0 ? (
                                    formatTime(times[times.length - 1].time)
                                ) : (
                                    <div>--.--</div>
                                )}
                            </td>
                            <td className="bg-gray-400 rounded-lg">
                                {times.length > 0 ? (
                                    formatTime(
                                        times.reduce((min, current) => {
                                            return current.time < min.time
                                                ? current
                                                : min;
                                        }, times[0]).time
                                    )
                                ) : (
                                    <div>--.--</div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">ao5</td>
                            <td className="bg-gray-400 rounded-lg">
                                {times.length >= 5 ? (
                                    formatTime(ao5)
                                ) : (
                                    <div>--.--</div>
                                )}
                            </td>
                            <td className="bg-gray-400 rounded-lg">
                                {times.length >= 5 ? (
                                    formatTime(bestAo5)
                                ) : (
                                    <div>--.--</div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">ao12</td>
                            <td className="bg-gray-400 rounded-lg">
                                {times.length >= 12 ? (
                                    formatTime(ao12)
                                ) : (
                                    <div>--.--</div>
                                )}
                            </td>
                            <td className="bg-gray-400 rounded-lg">
                                {times.length >= 12 ? (
                                    formatTime(bestAo12)
                                ) : (
                                    <div>--.--</div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-1 flex items-center">
                    <div className="font-bold">
                        Mean:{" "}
                        {times.length > 0
                            ? formatTime(
                                  (
                                      times.reduce(
                                          (sum, val) => sum + val.time,
                                          0
                                      ) / times.length
                                  ).toFixed(0)
                              )
                            : "--.--"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
