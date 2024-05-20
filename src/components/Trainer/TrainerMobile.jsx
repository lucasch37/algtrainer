import React, { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import generateScramble from "../../util/generateScramble";
import CasePanel from "./CasePanel";
import HintPanel from "./HintPanel";
import StatsPanel from "./StatsPanel";
import TimesPanel from "./TimesPanel";
import SelectTimes from "./SelectTimes";
import TimerMobile from "./TimerMobile";
import saveAlgset from "../../util/saveAlgset";

const TrainerMobile = () => {
    const [algset, setAlgset] = useState(null);
    const [view, setView] = useState("Timer");
    const [time, setTime] = useState(0);
    const [runTimer, setRunTimer] = useState(false);
    const [scramble, setScramble] = useState("");
    const [highlighted, setHighlighted] = useState("");
    const [savedTimes, setSavedTimes] = useState([]);
    const [alg, setAlg] = useState();
    const [showSelectAlgs, setShowSelectAlgs] = useState(false);
    const [back, setBack] = useState(0);

    //settings
    const [use3D, setUse3D] = useState(true);
    const [useAUF, setUseAUF] = useState(true);
    const [showAlg, setShowAlg] = useState(false);
    const [cn, setCn] = useState(false);
    const [hideCase, setHideCase] = useState(false);

    let inBetween = false;
    let hold = true;
    let holdTimeout;
    let hold1Second = false;

    const handleKeyDown = (event) => {
        if (inBetween && hold && !runTimer) {
            //stops timer
            setRunTimer(false);
            hold = false;
        } else if (hold) {
            setHighlighted("red");
            holdTimeout = setTimeout(() => {
                setHighlighted("green");
                hold1Second = true;
            }, 300);
        }
    };

    const handleKeyUp = (event) => {
        if (runTimer) {
            setRunTimer(false);
        } else if (!inBetween) {
            setHighlighted("");
            clearTimeout(holdTimeout);
            if (hold1Second) {
                hold1Second = false;
                setRunTimer(true);
                inBetween = true;
            }
        } else {
            inBetween = false;
            hold = true;
        }
    };

    const getScramble = async (AUF, cn) => {
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            const algs = algset.selectedAlgs;
            if (algs) {
                if (algs.length > 0) {
                    const index = Math.floor(Math.random() * algs.length);
                    setAlg(algs[index]);
                    const generatedScramble = await generateScramble(
                        algs[index].alg,
                        AUF,
                        cn
                    );
                    setScramble(generatedScramble);
                }
            }
        }
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            setAlgset(algset);
            setSavedTimes(algset.times);
        }
        const settings = JSON.parse(localStorage.getItem("settings"));
        if (settings) {
            setUse3D(settings[0]);
            setUseAUF(settings[1]);
            setShowAlg(settings[2]);
            setCn(settings[3]);
            setHideCase(settings[4]);
            getScramble(settings[1], settings[3]);
        } else {
            setUse3D(true);
            setUseAUF(true);
            setShowAlg(false);
            setCn(false);
            setHideCase(false);
            getScramble(true, false);
        }
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const targetDiv = document.getElementById("timer");
        if (targetDiv) {
            targetDiv.addEventListener("touchstart", handleKeyDown);
            targetDiv.addEventListener("touchend", handleKeyUp);
            targetDiv.addEventListener("contextmenu", handleContextMenu);
        }
        return () => {
            if (targetDiv) {
                targetDiv.removeEventListener("touchstart", handleKeyDown);
                targetDiv.removeEventListener("touchend", handleKeyUp);
                targetDiv.removeEventListener("contextmenu", handleContextMenu);
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
            saveTime([...savedTimes, data]);
            getScramble(useAUF, cn);
        }
    }, [runTimer]);

    const saveTime = (times) => {
        const algset = JSON.parse(localStorage.getItem("algset"));
        algset.times = JSON.stringify(times);
        localStorage.setItem("algset", JSON.stringify(algset));
        saveAlgset(JSON.parse(localStorage.getItem("algset")));
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
        } else if (name === "hideCase") {
            setHideCase((prevHideCase) => {
                const newValue = !prevHideCase;
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
            hideCase,
        ];
        if (name === "3d") {
            settings[0] = value;
        } else if (name === "auf") {
            settings[1] = value;
        } else if (name === "showAlg") {
            settings[2] = value;
        } else if (name === "cn") {
            settings[3] = value;
        } else if (name === "hideCase") {
            settings[4] = value;
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
            />
            <div className="flex justify-center font-semibold text-5xl mt-1">
                Trainer
            </div>
            <div className="flex justify-center mt-2">
                <div className="w-[90vw] flex flex-col">
                    <div className="flex justify-center text-xl text-blue-400 cursor-pointer mb-2">
                        <div onClick={() => setShowSelectAlgs(true)}>
                            {algset ? algset.selectedAlgs.length : 0}{" "}
                            {algset
                                ? algset.selectedAlgs.length !== 1
                                    ? "cases selected"
                                    : "case selected"
                                : "cases selected"}
                        </div>
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
                                className="w-full h-full bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center relative select-none"
                                id="timer"
                            >
                                <div
                                    className={`font-['Menlo'] text-6xl font-bold ${
                                        highlighted === "green" &&
                                        alg &&
                                        "text-green-500"
                                    } ${
                                        highlighted === "red" &&
                                        alg &&
                                        "text-red-400"
                                    } `}
                                >
                                    {alg ? (
                                        <TimerMobile
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
                            {alg ? (
                                <HintPanel alg={alg.alg} />
                            ) : (
                                <HintPanel alg={""} />
                            )}
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
                <div className="font-bold mr-1 mb-1 text-xl justify-center flex">
                    Settings:
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="border rounded-xl p-1 px-2 mr-1 mb-1 ">
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={use3D}
                            onChange={() => handleCheck("3d")}
                            id="3d"
                        />
                        <label className="text-sm">Use 3D Cube</label>
                    </div>
                    <div className="border rounded-xl p-1 px-2 mr-1 mb-1">
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={useAUF}
                            onChange={() => handleCheck("auf")}
                            id="auf"
                        />
                        <label className="text-sm">Use AUF</label>
                    </div>
                    <div className="border rounded-xl p-1 px-2 mr-1 mb-1">
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={showAlg}
                            onChange={() => handleCheck("showAlg")}
                            id="showAlg"
                        />
                        <label className="text-sm">Show Alg</label>
                    </div>
                    <div className="border rounded-xl p-1 px-2 mr-1 mb-1">
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={cn}
                            onChange={() => handleCheck("cn")}
                            id="cn"
                        />
                        <label className="text-sm">Color Neutral</label>
                    </div>
                    <div className="border rounded-xl p-1 px-2 mr-1 mb-1">
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={hideCase}
                            onChange={() => handleCheck("hideCase")}
                            id="hideCase"
                        />
                        <label className="text-sm">Hide Case</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerMobile;
