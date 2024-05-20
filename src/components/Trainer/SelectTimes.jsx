import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import saveAlgset from "../../util/saveAlgset";

const Alg = ({ alg, state, setSelectedAlgs, setCount, open, puzzle }) => {
    const [selected, setSelected] = useState(true);
    const [view, setView] = useState("Planted");
    const [highlighting, setHighlighting] = useState("All");

    useEffect(() => {
        const parsedSelAlgs = JSON.parse(
            localStorage.getItem("algset")
        ).selectedAlgs;
        if (parsedSelAlgs) {
            const selAlgs = parsedSelAlgs.map((alg) => alg.name);
            if (selAlgs.indexOf(alg.name) !== -1) {
                setSelected(true);
            } else {
                setSelected(false);
            }
        } else {
            setSelected(true);
        }
    }, [open]);

    useEffect(() => {
        if (state === "t") {
            setSelected(true);
        } else if (state === "f") {
            setSelected(false);
        } else {
            setSelected(state);
        }
    }, [state]);

    let count = 0;

    useEffect(() => {
        if (selected && count === 0) {
            setSelectedAlgs((prev) => [...prev, alg]);
            setCount((prev) => prev + 1);
            count++;
        } else if (count === 0) {
            setCount((prev) => prev - 1);
            setSelectedAlgs((prev) => {
                const updatedItems = prev.filter(
                    (item) => item.name !== alg.name
                );
                return updatedItems;
            });
        }
    }, [selected]);

    useEffect(() => {
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            setView(algset.settings[0]);
            setHighlighting(algset.settings[1]);
        }
    }, []);

    return (
        <div
            className={`p-1 flex flex-col items-center justify-center m-1.5 rounded-lg text-lg cursor-pointer ${
                selected ? "bg-gray-400" : "bg-gray-600 text-gray-400"
            }`}
            onClick={() => setSelected((prev) => !prev)}
        >
            {alg.name}
            <img
                src={`https://cubiclealgdbimagegen.azurewebsites.net/generator?&puzzle=${
                    puzzle === "3x3" ? "3" : "2"
                }&size=200&view=${view === "Planted" && "plan"}${
                    highlighting === "OLL" ? "&stage=oll" : ""
                }${highlighting === "F2L" ? "&stage=f2l" : ""}&case=${
                    alg.convertedAlg
                }`}
                alt={alg.name}
                className="w-20"
            />
        </div>
    );
};

const SelectTimes = ({ open, onClose }) => {
    const [state, setState] = useState(true);
    const [selectedAlgs, setSelectedAlgs] = useState([]);
    const [algs, setAlgs] = useState([]);
    const [puzzle, setPuzzle] = useState("3x3");
    const [count, setCount] = useState(0);

    const handleSave = () => {
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            algset.selectedAlgs = selectedAlgs;
            localStorage.setItem("algset", JSON.stringify(algset));
            saveAlgset(JSON.parse(localStorage.getItem("algset")));
        }
        window.location.reload();
    };

    useEffect(() => {
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            setAlgs(algset.algs);
            setPuzzle(algset.puzzle);
        }
    }, []);

    return (
        <Popup open={open}>
            <div className="lg:w-[900px] w-[350px] rounded-xl overflow-hidden">
                <div className="lg:text-3xl text-xl p-3 font-semibold">
                    Select Algorithms to Train
                </div>
                <div className="bg-gray-700 h-[450px] flex overflow-y-scroll">
                    <div className="px-4 py-2 w-full">
                        <div className="text-center font-bold text-2xl lg:text-3xl">
                            Total: {count}
                        </div>
                        <div className="justify-center flex">
                            <button
                                className="m-1 bg-green-700 text-green-300 py-2 px-4 rounded-xl lg:text-base text-sm"
                                onClick={() => {
                                    if (state && state !== "t") {
                                        setState("t");
                                    } else {
                                        setState(true);
                                    }
                                }}
                            >
                                Select All
                            </button>
                            <button
                                className="m-1 bg-red-800 text-red-300 py-2 px-4 p-2 rounded-xl lg:text-base text-sm"
                                onClick={() => {
                                    if (!state) {
                                        setState("f");
                                    } else {
                                        setState(false);
                                    }
                                }}
                            >
                                Deselect All
                            </button>
                        </div>
                        <div className="flex flex-wrap justify-center pb-2">
                            {algs.map((alg, index) => (
                                <Alg
                                    alg={alg}
                                    key={index}
                                    state={state}
                                    setSelectedAlgs={setSelectedAlgs}
                                    setCount={setCount}
                                    open={open}
                                    puzzle={puzzle}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-fit py-2 bg-gray-700 flex justify-end items-center border-t border-gray-400">
                    <div className="mr-2">
                        <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-red-800 text-red-200 rounded-lg lg:rounded-xl mr-1"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-green-700 text-green-300 rounded-lg lg:rounded-xl"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default SelectTimes;
