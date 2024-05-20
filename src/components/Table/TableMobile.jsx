import React, { useEffect, useState } from "react";
import { AiFillQuestionCircle, AiOutlinePlus } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import AddAlgs from "./AddAlgs";
import TableItemMobile from "./TableItemMobile";
import Settings from "./Settings";
import About from "./About";
import sortByTime from "../../util/sortByTime";
import { FaFolderOpen } from "react-icons/fa";
import Algsets from "./Algsets";

const TableMobile = () => {
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [data, setData] = useState([]);
    const [showAlgsets, setShowAlgsets] = useState(false);

    useEffect(() => {
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            const algData = algset.algs;
            const settings = algset.settings;
            if (algData) {
                setData(algData);
            }
            if (settings.length > 0) {
                handleSortChange(settings[2], algData);
            }
        }
    }, []);

    const handleSortChange = (value, algData) => {
        switch (value) {
            case "Name (A-Z)":
                algData.sort((a, b) => {
                    if (isNaN(a.name) || isNaN(b.name)) {
                        return a.name.localeCompare(b.name); // Compare alphabetically if not numbers
                    } else {
                        return parseFloat(a.name) - parseFloat(b.name); // Compare numerically if numbers
                    }
                });
                break;
            case "Name (Z-A)":
                algData.sort((a, b) => {
                    if (isNaN(a.name) || isNaN(b.name)) {
                        return b.name.localeCompare(a.name); // Compare alphabetically if not numbers
                    } else {
                        return parseFloat(b.name) - parseFloat(a.name); // Compare numerically if numbers
                    }
                });
                break;
            case "Shortest":
                algData.sort((a, b) => a.name.localeCompare(b.name));
                algData.sort((a, b) => a.alg.length - b.alg.length);
                break;
            case "Longest":
                algData.sort((a, b) => a.name.localeCompare(b.name));
                algData.sort((a, b) => b.alg.length - a.alg.length);
                break;
            case "Best Time":
                sortByTime(algData, "best", "best");
                break;
            case "Best Avg.":
                sortByTime(algData, "avg", "best");
                break;
            case "Worst Time":
                sortByTime(algData, "best", "worst");
                break;
            case "Worst Avg.":
                sortByTime(algData, "avg", "worst");
                break;
        }
        setData(algData);
    };

    return (
        <div className="pb-8 lg:hidden">
            <div className="text-center font-semibold text-5xl mt-1">
                Algorithms
            </div>
            <div className="flex flex-wrap justify-center mt-3">
                <button
                    className="px-3 py-2 rounded-xl bg-sky-700 text-sky-200 ml-1 flex items-center lg:text-base text-xs"
                    onClick={() => setShowAlgsets(true)}
                >
                    Algsets
                    <FaFolderOpen className="lg:text-xl ml-1" />
                </button>
                <button
                    className="px-3 py-2 rounded-xl bg-green-800 text-green-400 ml-1 flex items-center lg:text-base text-xs"
                    onClick={() => {
                        setShowAddMenu(true);
                    }}
                >
                    Add/Edit
                    <AiOutlinePlus className="lg:text-xl ml-1" />
                </button>
                <button
                    className="px-3 py-2 rounded-xl bg-gray-600 text-gray-300 flex items-center ml-1 lg:text-base text-xs"
                    onClick={() => setShowSettings(true)}
                >
                    Settings
                    <IoIosSettings className="lg:text-xl ml-1" />
                </button>
                <button
                    className="px-3 py-2 rounded-xl bg-blue-800 text-blue-200 flex items-center ml-1 lg:text-base text-xs"
                    onClick={() => setShowAbout(true)}
                >
                    About
                    <AiFillQuestionCircle className="lg:text-xl ml-1" />
                </button>
            </div>
            <AddAlgs open={showAddMenu} onClose={() => setShowAddMenu(false)} />
            <Settings
                open={showSettings}
                onClose={() => setShowSettings(false)}
            />
            <About open={showAbout} onClose={() => setShowAbout(false)} />
            <Algsets open={showAlgsets} onClose={() => setShowAlgsets(false)} />
            <div className="flex justify-center">
                <div className="flex flex-col justify-center mt-3 w-[90vw]">
                    {data.length > 0 ? (
                        data.map((data, index) => (
                            <TableItemMobile data={data} key={index} />
                        ))
                    ) : (
                        <div className="text-center text-gray-400">
                            No Algorithms Added
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableMobile;
