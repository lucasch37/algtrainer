import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import saveAlgs from "../../util/saveAlgs";
import PLL from "./Presets";
import isValid from "../../util/isValid";

const TextArea = ({ text, onChange }) => {
    return (
        <textarea
            id="algs"
            value={text}
            onChange={onChange}
            type="text"
            className="w-[700px] h-[400px] rounded-xl p-2 bg-[#283445] resize-none"
            placeholder={`Example:\nT: "R U R' U' R' F R2 U' R' U' R U R' F'"\nY: "F R U' R' U' R U R' F' R U R' U' R' F R F'"`}
        />
    );
};

const Input = ({ text, onChange, setView, setText }) => {
    return (
        <div className="px-4 py-2 w-full">
            <div className="mt-1 font-semibold text-xl">
                Enter Algorithms Here:
            </div>
            <div className="mt-1 flex items-center">
                <div className="mr-2">Add Preset:</div>
                <button className="py-1 px-3 rounded-xl bg-yellow-800 text-yellow-400 text-sm">
                    OLL
                </button>
                <button
                    className="py-1 px-3 rounded-xl bg-yellow-800 text-yellow-400 text-sm ml-1"
                    onClick={() => setText(PLL)}
                >
                    PLL
                </button>
                <div className="ml-2">(will replace any saved algs)</div>
            </div>
            <div className="mt-2">
                <TextArea text={text} onChange={onChange} />
            </div>
            <div className="mt-1 pb-3">
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
    );
};

const Format = () => {
    return (
        <div className="px-4 py-2 w-full">
            <div className="text-2xl font-semibold">Format</div>
            <div className="ml-4">
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
                    <li>There is no limit to the number of algorithms.</li>
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
            <div className="w-[900px] rounded-xl overflow-hidden">
                <div className="text-3xl p-4 font-semibold">
                    Add/Edit Algorithms
                </div>
                <div className="bg-gray-700 h-[450px] flex overflow-y-scroll">
                    <div className="border-r text-start w-fit border-gray-400 sticky top-0">
                        <div
                            className={`px-4 py-3 hover:bg-[#283445] ${
                                view === "Input" && "bg-[#283445]"
                            } `}
                            onClick={() => setView("Input")}
                        >
                            Add/Edit
                        </div>
                        <div
                            className={`px-4 py-3 hover:bg-[#283445] ${
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
                    <div className="mr-2 flex items-center">
                        {error && (
                            <div className="absolute left-2 text-red-400">
                                There was an error saving your algorithms,
                                please make sure to follow the correct format.
                            </div>
                        )}
                        <button
                            className="px-4 py-2 bg-red-800 text-red-200 rounded-xl mr-1"
                            onClick={() => {
                                onClose();
                                setError(false);
                                const savedText =
                                    localStorage.getItem("algText");
                                if (savedText) {
                                    setText(savedText);
                                }
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-green-800 text-green-400 rounded-xl"
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
