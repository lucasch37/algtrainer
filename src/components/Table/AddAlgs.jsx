import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import saveAlgs from "../../util/saveAlgs";
import { PLL, OLL } from "./Presets";
import isValid from "../../util/isValid";

const TextArea = ({ text, onChange }) => {
    return (
        <textarea
            value={text}
            onChange={onChange}
            type="text"
            className="lg:w-[700px] w-[65vw] h-[400px] rounded-xl p-2 bg-[#283445] resize-none lg:text-base text-xs"
            placeholder={`Example:\nT: "R U R' U' R' F R2 U' R' U' R U R' F'"\nY: "F R U' R' U' R U R' F' R U R' U' R' F R F'"`}
        />
    );
};

const Input = ({ text, onChange, setView, setText }) => {
    return (
        <div className="px-4 py-2 w-full">
            <div className="mt-1 font-semibold lg:text-xl text-xl">
                Enter Algorithms Here:
            </div>
            <div className="mt-1 flex items-center">
                <div className="mr-1 lg:text-base text-xs">Add Preset:</div>
                <button
                    className="py-1 px-3 rounded-xl bg-yellow-800 text-yellow-400 lg:text-sm text-xs"
                    onClick={() => setText(OLL)}
                >
                    OLL
                </button>
                <button
                    className="py-1 px-3 rounded-xl bg-yellow-800 text-yellow-400 lg:text-sm text-xs ml-1"
                    onClick={() => setText(PLL)}
                >
                    PLL
                </button>
            </div>
            <div className="mt-2">
                <TextArea text={text} onChange={onChange} />
            </div>
            <div className="flex pb-3 items-center">
                <button
                    className="py-1 px-3 mr-1 rounded-xl bg-red-800 text-red-200 lg:text-sm text-xs"
                    onClick={() => setText("")}
                >
                    Reset
                </button>
                <div className=" lg:text-base text-xs">
                    View the{" "}
                    <span
                        className="font-bold underline cursor-pointer"
                        onClick={() => setView("Format")}
                    >
                        Format
                    </span>{" "}
                    tab for info about formatting
                </div>
            </div>
        </div>
    );
};

const Format = () => {
    return (
        <div className="px-4 py-2 w-full">
            <div className="text-2xl font-semibold">Format</div>
            <div className="ml-4 lg:text-base text-xs">
                <ul className="list-disc">
                    <li>List each algorithm on a different line.</li>
                    <li>Seperate each move by at least one space.</li>
                    <li>
                        First list the name of the algorithm, followed by a
                        colon, and the the algorithm in quotations like below:
                    </li>
                </ul>
                <div className="bg-[#283445] rounded-xl p-2 w-fit">
                    <div>T: "R U R' U' R' F R2 U' R' U' R U R' F'"</div>
                    <div>
                        J: "R U R' F' R U R' U' R' F R2 U' R' U' R U R' F'"
                    </div>
                </div>
                <ul className="list-disc">
                    <li>
                        Give each algorithm a unique name (times are saved for
                        each name, so if you want unique times for every
                        algorithm use unique names)
                    </li>
                    <li>
                        Use only the following moves (', 2, or 3 can be added to
                        the end, but nothing 4 or above):
                    </li>
                </ul>
                <div className="bg-[#283445] rounded-xl p-2 w-fit">
                    <div>R L U D F B M S E r l u d f b</div>
                </div>
                <ul className="list-disc">
                    <li>
                        Almost any algorithm ranging from F2L, last layer,
                        blindfolded, FMC and more are usuable!
                    </li>
                </ul>
            </div>
        </div>
    );
};

const AddAlgs = ({ open, onClose }) => {
    const [view, setView] = useState("Input");
    const [text, setText] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSave = () => {
        if (isValid(text)) {
            onClose();
            saveAlgs(text);
            window.location.reload();
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        const savedText = localStorage.getItem("algText");
        if (savedText) {
            setText(savedText);
        }
    }, []);

    return (
        <Popup open={open}>
            <div className="lg:w-[900px] w-[93vw] rounded-xl overflow-hidden">
                <div className="lg:text-3xl text-xl p-4 font-semibold">
                    Add/Edit Algorithms
                </div>
                <div className="bg-gray-700 h-[450px] flex overflow-y-scroll">
                    <div className="border-r text-start w-fit border-gray-400 sticky top-0 lg:text-base text-xs">
                        <div
                            className={`lg:px-4 lg:py-3 px-2 py-1 hover:bg-[#283445] cursor-pointer ${
                                view === "Input" && "bg-[#283445]"
                            } `}
                            onClick={() => setView("Input")}
                        >
                            Add/Edit
                        </div>
                        <div
                            className={`lg:px-4 lg:py-3 px-2 py-1 hover:bg-[#283445] cursor-pointer ${
                                view === "Format" && "bg-[#283445]"
                            } `}
                            onClick={() => setView("Format")}
                        >
                            Format
                        </div>
                    </div>
                    {view === "Input" ? (
                        <Input
                            text={text}
                            onChange={handleChange}
                            setView={setView}
                            setText={setText}
                        />
                    ) : (
                        <Format />
                    )}
                </div>
                <div className="h-fit py-2 bg-gray-700 flex justify-end items-center border-t border-gray-400">
                    <div className="mr-2 flex items-center lg:text-base text-sm">
                        {error && (
                            <div className="absolute left-2 text-red-400">
                                There was an error saving your algorithms,
                                please make sure to follow the correct format.
                            </div>
                        )}
                        <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-red-800 text-red-200 rounded-lg lg:rounded-xl mr-1"
                            onClick={() => {
                                onClose();
                                setError(false);
                                const savedText =
                                    localStorage.getItem("algText");
                                if (savedText) {
                                    setText(savedText);
                                } else {
                                    setText("");
                                }
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-green-800 text-green-400 rounded-lg lg:rounded-xl"
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

export default AddAlgs;
