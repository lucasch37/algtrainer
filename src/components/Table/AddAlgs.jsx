import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import saveAlgs from "../../util/saveAlgs";
import PLL from "./Presets";

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
        </div>
    );
};

const AddAlgs = ({ open, onClose }) => {
    const [view, setView] = useState("Input");
    const [text, setText] = useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSave = () => {
        saveAlgs(text);
        window.location.reload();
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
                    <div className="mr-2">
                        <button
                            className="px-4 py-2 bg-red-800 text-red-200 rounded-xl mr-1"
                            onClick={onClose}
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
