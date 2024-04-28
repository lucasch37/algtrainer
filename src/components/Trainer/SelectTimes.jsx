import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import convertAlg from "../../util/convertAlg";

const Alg = ({ alg, state, setSelectedAlgs, setCount, open }) => {
    const [selected, setSelected] = useState(true);
    const [view, setView] = useState("Planted");
    const [highlighting, setHighlighting] = useState("All");

    useEffect(() => {
        const parsedSelAlgs = JSON.parse(localStorage.getItem("selectedAlgs"));
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
        const view = localStorage.getItem("image");
        if (view) {
            setView(view);
        }
        const highlighting = localStorage.getItem("highlighting");
        if (highlighting) {
            setHighlighting(highlighting);
        }
    }, []);

    return (
        <div
            className={`p-1 flex flex-col items-center justify-center m-1.5 rounded-xl text-lg cursor-pointer ${
                selected ? "bg-gray-400" : "bg-gray-600 text-gray-400"
            }`}
            onClick={() => setSelected((prev) => !prev)}
        >
            {alg.name}
            <img
                src={`http://cube.rider.biz/visualcube.php?fmt=svg&bg=t&size=200&view=${
                    view === "Planted" && "plan"
                }${highlighting === "OLL" ? "&stage=oll" : ""}${
                    highlighting === "F2L" ? "&stage=f2l" : ""
                }&case=${convertAlg(alg.alg)}`}
                alt={alg.name}
                className="w-20"
            />
        </div>
    );
};

const SelectTimes = ({ open, onClose, algs }) => {
    const [state, setState] = useState(true);
    const [selectedAlgs, setSelectedAlgs] = useState([]);
    const [count, setCount] = useState(0);

    const handleSave = () => {
        localStorage.setItem("selectedAlgs", JSON.stringify(selectedAlgs));
        window.location.reload();
    };

    return (
        <Popup open={open}>
            <div className="lg:w-[900px] w-[350px] rounded-xl overflow-hidden">
                <div className="lg:text-3xl text-xl p-3 font-semibold">
                    Select Algorithms to Train
                </div>
                <div className="bg-gray-700 h-[450px] flex overflow-y-scroll">
                    <div className="px-4 py-2 w-full">
                        <div className="text-center font-bold text-3xl">
                            Total: {count}
                        </div>
                        <div className="justify-center flex">
                            <button
                                className="m-1 bg-green-700 text-green-300 py-2 px-4 rounded-xl"
                                onClick={() => {
                                    if (state) {
                                        setState("t");
                                    } else {
                                        setState(true);
                                    }
                                }}
                            >
                                Select All
                            </button>
                            <button
                                className="m-1 bg-red-800 text-red-300 py-2 px-4 p-2 rounded-xl"
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
