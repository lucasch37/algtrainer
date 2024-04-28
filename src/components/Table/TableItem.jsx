import React, { useEffect, useState } from "react";
import convertAlg from "../../util/convertAlg";
import formatTime from "../../util/formatTime";

const TableItem = ({ data }) => {
    const [bestTime, setBestTime] = useState("-");
    const [avgTime, setAvgTime] = useState("-");
    const [times, setTimes] = useState([]);
    const [view, setView] = useState("Planted");
    const [highlighting, setHighlighting] = useState("All");

    useEffect(() => {
        const timeData = JSON.parse(localStorage.getItem("times"));
        if (timeData) {
            for (let i = 0; i < timeData.length; i++) {
                if (timeData[i].name === data.name) {
                    setTimes((prev) => [...prev, timeData[i]]);
                }
            }
        }
        const view = localStorage.getItem("image");
        if (view) {
            setView(view);
        }
        const highlighting = localStorage.getItem("highlighting");
        if (highlighting) {
            setHighlighting(highlighting);
        }
    }, []);

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
                    src={`https://cubiclealgdbimagegen.azurewebsites.net/generator?&puzzle=3&size=200&view=${
                        view === "Planted" && "plan"
                    }${highlighting === "OLL" ? "&stage=oll" : ""}${
                        highlighting === "F2L" ? "&stage=f2l" : ""
                    }&case=${convertAlg(data.alg)}`}
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
