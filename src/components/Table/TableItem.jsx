import React, { useEffect, useState } from "react";
import formatTime from "../../util/formatTime";

const TableItem = ({ data, sortBy }) => {
    const [bestTime, setBestTime] = useState("-");
    const [avgTime, setAvgTime] = useState("-");
    const [times, setTimes] = useState([]);
    const [view, setView] = useState("Planted");
    const [highlighting, setHighlighting] = useState("All");
    const [algset, setAlgset] = useState({});

    useEffect(() => {
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            setAlgset(algset);
            const timeData = algset.times;
            if (timeData) {
                setTimes([]);
                for (let i = 0; i < timeData.length; i++) {
                    if (timeData[i].name === data.name) {
                        setTimes((prev) => [...prev, timeData[i]]);
                    }
                }
            }
            const settings = algset.settings;
            if (settings.length > 0) {
                setView(settings[0]);
                setHighlighting(settings[1]);
            }
        }
    }, [sortBy]);

    useEffect(() => {
        if (times.length > 0) {
            let lowest = times[0].time;
            let total = 0;
            for (let i = 0; i < times.length; i++) {
                total += times[i].time;
                if (times[i].time < lowest) {
                    lowest = times[i].time;
                }
            }
            setBestTime(lowest);
            setAvgTime((total / times.length).toFixed(0));
        }
    }, [times]);

    return (
        <tr className="text-xl">
            <td className="border border-gray-600 text-center">{data.name}</td>
            <td className="border border-gray-600">
                <img
                    src={`https://cubiclealgdbimagegen.azurewebsites.net/generator?&puzzle=${
                        algset && algset.puzzle === "3x3" ? "3" : "2"
                    }&size=200&view=${view === "Planted" && "plan"}${
                        highlighting === "OLL" ? "&stage=oll" : ""
                    }${highlighting === "F2L" ? "&stage=f2l" : ""}&case=${
                        data.convertedAlg
                    }`}
                    alt={data.name}
                />
            </td>
            <td className="text-center border border-gray-600">{data.alg}</td>
            <td className="border border-gray-600 text-center">
                {bestTime !== "-" ? formatTime(bestTime) : bestTime}
            </td>
            <td className="border border-gray-600 text-center">
                {avgTime !== "-" ? formatTime(avgTime) : avgTime}
            </td>
        </tr>
    );
};

export default TableItem;
