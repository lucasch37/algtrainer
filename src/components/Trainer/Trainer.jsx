import React, { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import Timer from "./Timer";
import generateScramble from "../../util/generateScramble";
import CasePanel from "./CasePanel";
import HintPanel from "./HintPanel";
import StatsPanel from "./StatsPanel";
import TimesPanel from "./TimesPanel";
import SelectTimes from "./SelectTimes";
import saveAlgset from "../../util/saveAlgset";

const Trainer = () => {
    const [algset, setAlgset] = useState(null);
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
    const [hideCase, setHideCase] = useState(false);

    let inBetween = false;
    let hold = true;

    const handleKeyDown = (event) => {
        if (event.code === "Space") {
            event.preventDefault();
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
            event.preventDefault();
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
        algset.times = times;
        localStorage.setItem("algset", JSON.stringify(algset));
        saveAlgset(algset);
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
        <div className="lg:block hidden">
            <SelectTimes
                open={showSelectAlgs}
                onClose={() => setShowSelectAlgs(false)}
            />
            <div className="flex justify-center font-semibold text-5xl mt-3">
                Trainer
            </div>
            <div className="flex justify-center mt-4">
                <div className="w-[90vw] max-w-[1800px] h-[70vh] max-h-[830px] justify-between flex flex-col">
                    <div className="h-[8%] bg-gray-800 rounded-xl flex items-center justify-center text-3xl relative">
                        <button className="absolute left-0">
                            <IoMdArrowDropleft
                                className={`text-5xl ${
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
                                className="text-5xl"
                                onClick={handleForward}
                            />
                        </button>
                    </div>
                    <div className="justify-between flex h-[90%]">
                        <div className="w-[57%] h-full bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center relative">
                            <div
                                className="absolute top-2 text-2xl text-blue-400 cursor-pointer hover:text-blue-600"
                                onClick={() => setShowSelectAlgs(true)}
                            >
                                {algset ? algset.selectedAlgs.length : 0}{" "}
                                {algset
                                    ? algset.selectedAlgs.length !== 1
                                        ? "cases selected"
                                        : "case selected"
                                    : "cases selected"}
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
            <div className="flex justify-center items-center mt-3">
                <div className="font-bold mr-2 text-2xl">Settings:</div>
                <div className="border rounded-xl p-1 px-2 mr-2">
                    <input
                        type="checkbox"
                        className="mr-1"
                        checked={use3D}
                        onChange={() => handleCheck("3d")}
                        id="3d"
                    />
                    <label className="text-xl">Use 3D Cube</label>
                </div>
                <div className="border rounded-xl p-1 px-2 mr-2">
                    <input
                        type="checkbox"
                        className="mr-1"
                        checked={useAUF}
                        onChange={() => handleCheck("auf")}
                        id="auf"
                    />
                    <label className="text-xl">Use AUF</label>
                </div>
                <div className="border rounded-xl p-1 px-2 mr-2">
                    <input
                        type="checkbox"
                        className="mr-1"
                        checked={showAlg}
                        onChange={() => handleCheck("showAlg")}
                        id="showAlg"
                    />
                    <label className="text-xl">Show Alg</label>
                </div>
                <div className="border rounded-xl p-1 px-2 mr-2">
                    <input
                        type="checkbox"
                        className="mr-1"
                        checked={cn}
                        onChange={() => handleCheck("cn")}
                        id="cn"
                    />
                    <label className="text-xl">Color Neutral</label>
                </div>
                <div className="border rounded-xl p-1 px-2 mr-2">
                    <input
                        type="checkbox"
                        className="mr-1"
                        checked={hideCase}
                        onChange={() => handleCheck("hideCase")}
                        id="hideCase"
                    />
                    <label className="text-xl">Hide Case</label>
                </div>
            </div>
        </div>
    );
};

export default Trainer;
