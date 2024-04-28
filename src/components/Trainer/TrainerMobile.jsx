import React, { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import Timer from "./Timer";
import generateScramble from "../../util/generateScramble";
import CasePanel from "./CasePanel";
import HintPanel from "./HintPanel";
import StatsPanel from "./StatsPanel";
import TimesPanel from "./TimesPanel";
import SelectTimes from "./SelectTimes";

const TrainerMobile = () => {
    const [view, setView] = useState("Timer");
    const [time, setTime] = useState(0);
    const [runTimer, setRunTimer] = useState(false);
    const [scramble, setScramble] = useState("");
    const [highlighted, setHighlighted] = useState(false);
    const [savedTimes, setSavedTimes] = useState([]);
    const [alg, setAlg] = useState();
    const [showSelectAlgs, setShowSelectAlgs] = useState(false);
    const [back, setBack] = useState(0);

    //settings
    const [use3D, setUse3D] = useState(true);
    const [useAUF, setUseAUF] = useState(true);
    const [showAlg, setShowAlg] = useState(false);
    const [cn, setCn] = useState(false);

    let inBetween = false;
    let hold = true;

    const handleKeyDown = (event) => {
        if (inBetween && hold && !runTimer) {
            //stops timer
            setRunTimer(false);
            hold = false;
        } else if (hold) {
            setHighlighted(true);
        }
    };

    const handleKeyUp = (event) => {
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
    };

    const getScramble = (AUF, cn) => {
        const algs = JSON.parse(localStorage.getItem("selectedAlgs"));
        if (algs) {
            if (algs.length > 0) {
                const index = Math.floor(Math.random() * algs.length);
                setAlg(algs[index]);
                const generatedScramble = generateScramble(
                    algs[index].alg,
                    AUF,
                    cn
                );
                setScramble(generatedScramble);
            }
        }
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("times"))) {
            setSavedTimes(JSON.parse(localStorage.getItem("times")));
        }
        if (JSON.parse(localStorage.getItem("settings"))) {
            setUse3D(JSON.parse(localStorage.getItem("settings"))[0]);
            setUseAUF(JSON.parse(localStorage.getItem("settings"))[1]);
            setShowAlg(JSON.parse(localStorage.getItem("settings"))[2]);
            setCn(JSON.parse(localStorage.getItem("settings"))[3]);
            getScramble(
                JSON.parse(localStorage.getItem("settings"))[1],
                JSON.parse(localStorage.getItem("settings"))[3]
            );
        } else {
            setUse3D(true);
            setUseAUF(true);
            setShowAlg(false);
            setCn(false);
            getScramble(true, false);
        }
    }, []);

    useEffect(() => {
        const targetDiv = document.getElementById("timer");
        if (targetDiv) {
            targetDiv.addEventListener("touchstart", handleKeyDown);
            targetDiv.addEventListener("touchend", handleKeyUp);
        }
        return () => {
            if (targetDiv) {
                targetDiv.removeEventListener("touchstart", handleKeyDown);
                targetDiv.removeEventListener("touchend", handleKeyUp);
            }
        };
    }, [view]);

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
            getScramble(useAUF, cn);
        }
    }, [runTimer]);

    const saveTime = (times) => {
        localStorage.setItem("times", times);
    };

    const handleCheck = (name) => {
        if (name === "3d") {
            setUse3D((prevUse3D) => {
                const newValue = !prevUse3D;
                saveSettings(name, newValue);
                return newValue;
            });
        } else if (name === "auf") {
            setUseAUF((prevUseAUF) => {
                const newValue = !prevUseAUF;
                saveSettings(name, newValue);
                return newValue;
            });
        } else if (name === "showAlg") {
            setShowAlg((prevShowAlg) => {
                const newValue = !prevShowAlg;
                saveSettings(name, newValue);
                return newValue;
            });
        } else if (name === "cn") {
            setCn((prevCn) => {
                const newValue = !prevCn;
                saveSettings(name, newValue);
                return newValue;
            });
        }
    };

    const saveSettings = (name, value) => {
        const settings = JSON.parse(localStorage.getItem("settings")) || [
            use3D,
            useAUF,
            showAlg,
            cn,
        ];
        if (name === "3d") {
            settings[0] = value;
        } else if (name === "auf") {
            settings[1] = value;
        } else if (name === "showAlg") {
            settings[2] = value;
        } else if (name === "cn") {
            settings[3] = value;
        }
        localStorage.setItem("settings", JSON.stringify(settings));
    };

    const handleBack = () => {
        if (back + 1 <= savedTimes.length)
            setBack((prev) => {
                setScramble(savedTimes[savedTimes.length - prev - 1].scramble);
                return prev + 1;
            });
    };

    const handleForward = () => {
        if (back > 0) {
            console.log(back);
            setBack((prev) => {
                setScramble(savedTimes[savedTimes.length - prev].scramble);
                return prev - 1;
            });
        } else {
            getScramble(useAUF, cn);
        }
    };

    return (
        <div className="lg:hidden">
            <SelectTimes
                open={showSelectAlgs}
                onClose={() => setShowSelectAlgs(false)}
                algs={JSON.parse(localStorage.getItem("algData"))}
            />
            <div className="flex justify-center font-semibold text-5xl mt-1">
                Trainer
            </div>
            <div className="flex justify-center mt-2">
                <div className="w-[90vw] flex flex-col">
                    <div
                        className="text-center text-xl text-blue-400 cursor-pointer mb-2"
                        onClick={() => setShowSelectAlgs(true)}
                    >
                        {localStorage.getItem("selectedAlgs")
                            ? JSON.parse(localStorage.getItem("selectedAlgs"))
                                  .length
                            : 0}{" "}
                        cases selected
                    </div>
                    <div className="h-[60px] bg-gray-800 rounded-xl flex items-center justify-center relative flex-wrap text-center px-10 mb-2">
                        <button className="absolute left-0">
                            <IoMdArrowDropleft
                                className={`text-2xl ${
                                    back + 1 <= savedTimes.length
                                        ? "text-white"
                                        : "text-gray-600"
                                }`}
                                onClick={handleBack}
                            />
                        </button>
                        {scramble}
                        <button className="absolute right-0">
                            <IoMdArrowDropright
                                className="text-2xl"
                                onClick={handleForward}
                            />
                        </button>
                    </div>
                    {view === "Timer" ? (
                        <div className="justify-between flex h-[50vh] mb-2">
                            <div
                                className="w-full h-full bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center relative"
                                id="timer"
                            >
                                <div
                                    className={`font-['Menlo'] text-6xl font-bold ${
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
                        </div>
                    ) : (
                        <div className=" grid grid-cols-2 gap-2 mb-2">
                            <CasePanel scramble={scramble} />
                            <HintPanel alg={alg.alg} />
                            <StatsPanel times={savedTimes} />
                            <TimesPanel
                                times={savedTimes}
                                setSavedTimes={setSavedTimes}
                            />
                        </div>
                    )}
                    <div className="flex justify-between">
                        <button
                            className="w-[49%] bg-gray-800 rounded-xl py-1"
                            onClick={() => setView("Timer")}
                        >
                            Timer
                        </button>
                        <button
                            className="w-[49%] bg-gray-800 rounded-xl py-1"
                            onClick={() => setView("Panels")}
                        >
                            Panels
                        </button>
                    </div>
                </div>
            </div>
            <div className="justify-center items-center my-2">
                <div className="font-bold mr-2 text-xl justify-center flex">
                    Settings:
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="border rounded-xl p-1 px-2 mr-2">
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={use3D}
                            onChange={() => handleCheck("3d")}
                            id="3d"
                        />
                        <label className="text-sm">Use 3D Cube</label>
                    </div>
                    <div className="border rounded-xl p-1 px-2 mr-2">
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={useAUF}
                            onChange={() => handleCheck("auf")}
                            id="auf"
                        />
                        <label className="text-sm">Use AUF</label>
                    </div>
                    <div className="border rounded-xl p-1 px-2 mr-2">
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={showAlg}
                            onChange={() => handleCheck("showAlg")}
                            id="showAlg"
                        />
                        <label className="text-sm">Show Alg</label>
                    </div>
                    <div className="border rounded-xl p-1 px-2 mr-2">
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={cn}
                            onChange={() => handleCheck("cn")}
                            id="cn"
                        />
                        <label className="text-sm">Color Neutral</label>
                    </div>
                    <button
                        className="text-center text-sm underline text-red-500"
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
        </div>
    );
};

export default TrainerMobile;
