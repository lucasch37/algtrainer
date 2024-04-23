import React, { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import Timer from "./Timer";
import generateScramble from "../../util/generateScramble";
import CasePanel from "./CasePanel";
import HintPanel from "./HintPanel";
import StatsPanel from "./StatsPanel";
import TimesPanel from "./TimesPanel";
import Popup from "../Popup";
import SelectTimes from "./SelectTimes";

const Trainer = () => {
    const [time, setTime] = useState(0);
    const [runTimer, setRunTimer] = useState(false);
    const [scramble, setScramble] = useState("");
    const [highlighted, setHighlighted] = useState(false);
    const [savedTimes, setSavedTimes] = useState([]);
    const [alg, setAlg] = useState();
    const [showSelectAlgs, setShowSelectAlgs] = useState(false);

    let inBetween = false;
    let hold = true;

    const handleKeyDown = (event) => {
        if (event.code === "Space") {
            if (inBetween && hold && !runTimer) {
                //stops timer
                setRunTimer(false);
                hold = false;
            } else if (hold) {
                setHighlighted(true);
            }
        }
    };

    const handleKeyUp = (event) => {
        if (event.code === "Space") {
            if (runTimer) {
                setRunTimer(false);
            } else if (!inBetween) {
                setRunTimer(true);
                setHighlighted(false);
                inBetween = true;
            } else {
                inBetween = false;
                hold = true;
            }
        }
    };

    const getScramble = () => {
        const algs = JSON.parse(localStorage.getItem("selectedAlgs"));
        if (algs.length > 0) {
            const index = Math.floor(Math.random() * algs.length);
            setAlg(algs[index]);
            const generatedScramble = generateScramble(algs[index].alg);
            setScramble(generatedScramble);
        }
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("times"))) {
            setSavedTimes(JSON.parse(localStorage.getItem("times")));
        }
        getScramble();
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (!runTimer && time !== 0) {
            const data = {
                time: time,
                scramble: scramble,
                alg: alg.alg,
                name: alg.name,
            };
            setSavedTimes((prev) => [...prev, data]);
            saveTime(JSON.stringify([...savedTimes, data]));
            getScramble();
        }
    }, [runTimer]);

    const saveTime = (times) => {
        localStorage.setItem("times", times);
    };

    return (
        <div>
            <SelectTimes
                open={showSelectAlgs}
                onClose={() => setShowSelectAlgs(false)}
                algs={JSON.parse(localStorage.getItem("algData"))}
            />
            <div className="flex justify-center font-semibold text-5xl mt-3">
                Trainer
            </div>
            <div className="flex justify-center mt-4">
                <div className="w-[90vw] h-[70vh] justify-between flex flex-col">
                    <div className="h-[8%] bg-gray-800 rounded-xl flex items-center justify-center text-3xl relative">
                        <button className="absolute left-0">
                            <IoMdArrowDropleft className="text-5xl" />
                        </button>
                        {scramble}
                        <button className="absolute right-0">
                            <IoMdArrowDropright className="text-5xl" />
                        </button>
                    </div>
                    <div className="justify-between flex h-[90%]">
                        <div className="w-[57%] h-full bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center relative">
                            <div
                                className="absolute top-2 text-2xl text-blue-400 cursor-pointer"
                                onClick={() => setShowSelectAlgs(true)}
                            >
                                {localStorage.getItem("selectedAlgs")
                                    ? JSON.parse(
                                          localStorage.getItem("selectedAlgs")
                                      ).length
                                    : 0}{" "}
                                cases selected
                            </div>
                            <div
                                className={`font-['Menlo'] text-8xl font-bold ${
                                    highlighted && alg && "text-green-500"
                                } `}
                            >
                                {alg ? (
                                    <Timer
                                        runTimer={runTimer}
                                        time={time}
                                        setTime={setTime}
                                    />
                                ) : (
                                    "--.--"
                                )}
                            </div>
                        </div>
                        <div className="w-[20%] h-full flex flex-col justify-between">
                            <CasePanel scramble={scramble} />
                            {alg ? (
                                <HintPanel alg={alg.alg} />
                            ) : (
                                <HintPanel alg={""} />
                            )}
                        </div>
                        <div className="w-[20%] h-full flex flex-col justify-between">
                            <StatsPanel times={savedTimes} />
                            <TimesPanel
                                times={savedTimes}
                                setSavedTimes={setSavedTimes}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="text-center bg-red-800 text-red-300 px-3 py-2 rounded-xl mt-2"
                    onClick={() => {
                        localStorage.removeItem("times");
                        localStorage.removeItem("ao5");
                        window.location.reload();
                    }}
                >
                    Delete All Times
                </button>
            </div>
        </div>
    );
};

export default Trainer;
