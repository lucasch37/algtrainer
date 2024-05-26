import React, { useEffect, useState } from "react";
import Popup from "./Popup.jsx";

const Welcome = ({ open, onClose }) => {
    const [text, setText] = useState("");
    const [errorText, setErrorText] = useState("");
    const [puzzle, setPuzzle] = useState("3x3");

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handlePuzzleChange = (event) => {
        setPuzzle(event);
    };

    const handleSave = () => {
        if (text.length > 0 && text.length < 20) {
            const algsets = JSON.parse(localStorage.getItem("algsets"));
            let isError = false;
            if (algsets) {
                for (let i = 0; i < algsets.length; i++) {
                    if (algsets[i].name === text) {
                        setErrorText(
                            "Please use a unique name for each algset"
                        );
                        isError = true;
                    }
                }
            }
            if (!isError) {
                setErrorText("");
                onClose();
                const algset = {
                    name: text,
                    algs: [],
                    selectedAlgs: [],
                    times: [],
                    algText: "",
                    settings: ["Planted", "All", "Custom"],
                    puzzle: puzzle,
                };
                localStorage.setItem("algset", JSON.stringify(algset));
                if (algsets) {
                    algsets.push(algset);
                    localStorage.setItem("algsets", JSON.stringify(algsets));
                } else {
                    localStorage.setItem("algsets", JSON.stringify([algset]));
                }
                window.location.reload();
            }
        } else {
            setErrorText("Please use a name between 1 and 20 characters.");
        }
    };

    return (
        <Popup open={open}>
            <div className="lg:w-[700px] w-[93vw] rounded-xl overflow-hidden">
                <div className="lg:text-3xl text-xl p-4 font-semibold ">
                    Create New Algset
                </div>
                <div className="bg-gray-700 h-fit flex overflow-y-auto">
                    <div className="px-3 py-2 w-full">
                        <div className="flex items-center">
                            <div className="font-semibold text-xl">Name:</div>
                            <input
                                type="text"
                                className="bg-[#283445] px-2 py-1 rounded-lg text-lg ml-2 w-96"
                                value={text}
                                onChange={handleTextChange}
                                placeholder="Enter algset name (20 characters max)"
                            />
                        </div>
                        <div className="flex items-center mt-1">
                            <div className="font-semibold text-xl">Puzzle:</div>
                            <select
                                value={puzzle}
                                className="p-1 lg:p-1.5 ml-1 lg:text-base text-sm text-center bg-[#283445] rounded-lg"
                                onChange={(e) =>
                                    handlePuzzleChange(e.target.value)
                                }
                            >
                                <option value="3x3">3x3</option>
                                <option value="2x2">2x2</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="h-fit py-2 bg-gray-700 flex justify-end items-center border-t border-gray-400">
                    <div className="mr-2 flex items-center lg:text-base text-sm">
                        <div className="absolute left-2 text-red-400">
                            {errorText}
                        </div>
                        {/* <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-red-800 text-red-200 rounded-lg lg:rounded-xl mr-1"
                            onClick={() => {
                                onClose();
                                setText("");
                                setErrorText("");
                            }}
                        >
                            Cancel
                        </button> */}
                        <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-green-800 text-green-400 rounded-lg lg:rounded-xl"
                            onClick={handleSave}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default Welcome;
