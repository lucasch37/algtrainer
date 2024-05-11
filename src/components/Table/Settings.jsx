import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import saveAlgset from "../../util/saveAlgset";

const Settings = ({ open, onClose }) => {
    const [image, setImage] = useState("Planted");
    const [highlighting, setHighlighting] = useState("All");
    const [sortBy, setSortBy] = useState("Custom");

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleHighlightChange = (event) => {
        setHighlighting(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortBy(event);
    };

    const handleSave = () => {
        onClose();
        if (localStorage.getItem("algset")) {
            const settings = [image, highlighting, sortBy];
            const algset = JSON.parse(localStorage.getItem("algset"));
            algset.settings = JSON.stringify(settings);
            localStorage.setItem("algset", JSON.stringify(algset));
            saveAlgset(JSON.parse(localStorage.getItem("algset")));
        }
        window.location.reload();
    };

    useEffect(() => {
        if (localStorage.getItem("algset")) {
            const algset = JSON.parse(localStorage.getItem("algset"));
            if (JSON.parse(algset.settings).length > 0) {
                const settings = JSON.parse(algset.settings);
                setImage(settings[0]);
                setHighlighting(settings[1]);
                setSortBy(settings[2]);
            }
        }
    }, []);

    return (
        <Popup open={open}>
            <div className="lg:w-[900px] w-[93vw] rounded-xl overflow-hidden">
                <div className="lg:text-3xl text-xl p-4 font-semibold ">
                    Settings
                </div>
                <div className="bg-gray-700 h-fit flex overflow-y-scroll">
                    <div className="px-4 py-3">
                        <div className="flex items-center">
                            <div className="lg:text-xl font-semibold mr-2">
                                Case Image:
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    value="Planted"
                                    checked={image === "Planted"}
                                    onChange={handleImageChange}
                                />{" "}
                                Planted
                                <input
                                    type="radio"
                                    value="Cube"
                                    checked={image === "Cube"}
                                    onChange={handleImageChange}
                                    className="ml-2"
                                />{" "}
                                Cube
                            </div>
                        </div>
                        <div className="flex items-center mt-1">
                            <div className="lg:text-xl font-semibold mr-2">
                                Image Highlighting:
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    value="All"
                                    checked={highlighting === "All"}
                                    onChange={handleHighlightChange}
                                />{" "}
                                All
                                <input
                                    type="radio"
                                    value="OLL"
                                    checked={highlighting === "OLL"}
                                    onChange={handleHighlightChange}
                                    className="ml-2"
                                />{" "}
                                OLL
                                <input
                                    type="radio"
                                    value="F2L"
                                    checked={highlighting === "F2L"}
                                    onChange={handleHighlightChange}
                                    className="ml-2"
                                />{" "}
                                F2L
                            </div>
                        </div>
                        <div className="flex items-center mt-1">
                            <div className="lg:text-xl font-semibold mr-2">
                                Sort by:
                            </div>
                            <div className="">
                                <select
                                    value={sortBy}
                                    className="p-1 text-center bg-gray-800 rounded-xl"
                                    onChange={(e) =>
                                        handleSortChange(e.target.value)
                                    }
                                >
                                    <option value="Custom">Custom</option>
                                    <option value="Name">Name</option>
                                    <option value="Shortest">Shortest</option>
                                    <option value="Longest">Longest</option>
                                    <option value="Best Time">Best Time</option>
                                    <option value="Avg. Time">Avg. Time</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center mt-1">
                            <div className="lg:text-xl font-semibold">
                                Reset:
                            </div>
                            <div
                                className="lg:text-base text-red-500 underline ml-2 cursor-pointer"
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}
                            >
                                Reset Everything
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit py-2 bg-gray-700 flex justify-end items-center border-t border-gray-400">
                    <div className="mr-2 flex items-center lg:text-base text-sm">
                        <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-red-800 text-red-200 rounded-lg lg:rounded-xl mr-1"
                            onClick={() => {
                                onClose();
                                if (localStorage.getItem("algset")) {
                                    const algset = JSON.parse(
                                        localStorage.getItem("algset")
                                    );
                                    if (
                                        JSON.parse(algset.settings).length > 0
                                    ) {
                                        const settings = JSON.parse(
                                            algset.settings
                                        );
                                        setImage(settings[0]);
                                        setHighlighting(settings[1]);
                                        setHighlighting(settings[2]);
                                    } else {
                                        setImage("Planted");
                                        setHighlighting("All");
                                        setSortBy("Custom");
                                    }
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

export default Settings;
