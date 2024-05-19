import React, { useEffect, useState } from "react";
import { AiFillQuestionCircle, AiOutlinePlus } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { FaFolderOpen, FaSortDown, FaSortUp } from "react-icons/fa";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import AddAlgs from "./AddAlgs";
import TableItem from "./TableItem";
import Settings from "./Settings";
import About from "./About";
import sortByTime from "../../util/sortByTime";
import Algsets from "./Algsets";
import saveAlgset from "../../util/saveAlgset";
import solve2x2 from "../../util/solve2x2";
import { Alg } from "cubing/alg";

const Table = () => {
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [data, setData] = useState([]);
    const [showAlgsets, setShowAlgsets] = useState(false);
    const [sortBy, setSortBy] = useState("Custom");

    useEffect(() => {
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            const algData = algset.algs;
            const settings = JSON.parse(algset.settings);
            if (algData) {
                const algDataParsed = JSON.parse(algData);
                setData(algDataParsed);
            }
            if (settings.length > 0) {
                handleSortChange(settings[2], JSON.parse(algData));
            }
        }
    }, []);

    const handleSaveSort = (sortBy) => {
        if (localStorage.getItem("algset")) {
            const algset = JSON.parse(localStorage.getItem("algset"));
            const settings = JSON.parse(algset.settings);
            settings[2] = sortBy;
            algset.settings = JSON.stringify(settings);
            localStorage.setItem("algset", JSON.stringify(algset));
            saveAlgset(JSON.parse(localStorage.getItem("algset")));
        }
    };

    const handleSortChange = (value, algData) => {
        handleSaveSort(value);
        setSortBy(value);
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
        <div className="pb-8 lg:block hidden">
            <div className="text-center font-semibold text-5xl mt-2">
                Algorithms
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="px-3 py-2 rounded-xl bg-sky-700 text-sky-200 ml-2 flex items-center text-base"
                    onClick={() => setShowAlgsets(true)}
                >
                    Algsets
                    <FaFolderOpen className="lg:text-xl ml-1" />
                </button>
                <button
                    className="px-3 py-2 rounded-xl bg-green-800 text-green-400 ml-2 flex items-center text-base"
                    onClick={() => setShowAddMenu(true)}
                >
                    Add/Edit Algorithms
                    <AiOutlinePlus className="lg:text-xl ml-1" />
                </button>
                <button
                    className="px-3 py-2 rounded-xl bg-gray-600 text-gray-300 flex items-center ml-2 text-base"
                    onClick={() => setShowSettings(true)}
                >
                    Settings
                    <IoIosSettings className="lg:text-xl ml-1" />
                </button>
                <button
                    className="px-3 py-2 rounded-xl bg-blue-800 text-blue-200 flex items-center ml-2 text-base"
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
            <Algsets open={showAlgsets} onClose={() => setShowAlgsets(false)} />
            <About open={showAbout} onClose={() => setShowAbout(false)} />
            <div className="flex justify-center mt-4">
                <div className=" rounded-xl overflow-hidden">
                    <table className="bg-gray-700 w-[95vw]">
                        <thead>
                            <tr className="bg-gray-800 rounded-t-xl lg:text-xl">
                                <th className="w-[10%] p-2">
                                    <div className="flex justify-center items-center">
                                        Name
                                        <div className="text-xxs ml-2">
                                            <BiSolidUpArrow
                                                className={`${
                                                    sortBy === "Name (Z-A)"
                                                        ? "opacity-0"
                                                        : "cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    handleSortChange(
                                                        "Name (Z-A)",
                                                        JSON.parse(
                                                            JSON.parse(
                                                                localStorage.getItem(
                                                                    "algset"
                                                                )
                                                            ).algs
                                                        )
                                                    )
                                                }
                                            />
                                            <BiSolidDownArrow
                                                className={`${
                                                    sortBy === "Name (A-Z)"
                                                        ? "opacity-0"
                                                        : "cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    handleSortChange(
                                                        "Name (A-Z)",
                                                        JSON.parse(
                                                            JSON.parse(
                                                                localStorage.getItem(
                                                                    "algset"
                                                                )
                                                            ).algs
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th className="w-[10%] p-2">Case</th>
                                <th className="w-[60%] p-2">
                                    <div className="flex justify-center items-center">
                                        Algorithm
                                        <div className="text-xxs ml-2">
                                            <BiSolidUpArrow
                                                className={`${
                                                    sortBy === "Longest"
                                                        ? "opacity-0"
                                                        : "cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    handleSortChange(
                                                        "Longest",
                                                        JSON.parse(
                                                            JSON.parse(
                                                                localStorage.getItem(
                                                                    "algset"
                                                                )
                                                            ).algs
                                                        )
                                                    )
                                                }
                                            />
                                            <BiSolidDownArrow
                                                className={`${
                                                    sortBy === "Shortest"
                                                        ? "opacity-0"
                                                        : "cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    handleSortChange(
                                                        "Shortest",
                                                        JSON.parse(
                                                            JSON.parse(
                                                                localStorage.getItem(
                                                                    "algset"
                                                                )
                                                            ).algs
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th className="w-[10%] p-2">
                                    <div className="flex justify-center items-center">
                                        Best
                                        <div className="text-xxs ml-2">
                                            <BiSolidUpArrow
                                                className={`${
                                                    sortBy === "Worst Time"
                                                        ? "opacity-0"
                                                        : "cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    handleSortChange(
                                                        "Worst Time",
                                                        JSON.parse(
                                                            JSON.parse(
                                                                localStorage.getItem(
                                                                    "algset"
                                                                )
                                                            ).algs
                                                        )
                                                    )
                                                }
                                            />
                                            <BiSolidDownArrow
                                                className={`${
                                                    sortBy === "Best Time"
                                                        ? "opacity-0"
                                                        : "cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    handleSortChange(
                                                        "Best Time",
                                                        JSON.parse(
                                                            JSON.parse(
                                                                localStorage.getItem(
                                                                    "algset"
                                                                )
                                                            ).algs
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th className="w-[10%] p-2">
                                    <div className="flex justify-center items-center">
                                        Avg.
                                        <div className="text-xxs ml-2">
                                            <BiSolidUpArrow
                                                className={`${
                                                    sortBy === "Worst Avg."
                                                        ? "opacity-0"
                                                        : "cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    handleSortChange(
                                                        "Worst Avg.",
                                                        JSON.parse(
                                                            JSON.parse(
                                                                localStorage.getItem(
                                                                    "algset"
                                                                )
                                                            ).algs
                                                        )
                                                    )
                                                }
                                            />
                                            <BiSolidDownArrow
                                                className={`${
                                                    sortBy === "Best Avg."
                                                        ? "opacity-0"
                                                        : "cursor-pointer"
                                                }`}
                                                onClick={() =>
                                                    handleSortChange(
                                                        "Best Avg.",
                                                        JSON.parse(
                                                            JSON.parse(
                                                                localStorage.getItem(
                                                                    "algset"
                                                                )
                                                            ).algs
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((data, index) => (
                                    <TableItem
                                        key={index}
                                        data={data}
                                        sortBy={sortBy}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="text-center text-lg p-5 text-gray-400">
                                        No Algorithms Added
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
