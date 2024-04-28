import React, { useEffect, useState } from "react";
import { AiFillQuestionCircle, AiOutlinePlus } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import AddAlgs from "./AddAlgs";
import TableItem from "./TableItem";
import Settings from "./Settings";
import About from "./About";

const Table = () => {
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const algData = localStorage.getItem("algData");
        if (algData) {
            const algDataParsed = JSON.parse(algData);
            setData(algDataParsed);
        }
        if (localStorage.getItem("sortBy")) {
            handleSortChange(
                localStorage.getItem("sortBy"),
                JSON.parse(localStorage.getItem("algData"))
            );
        }
    }, []);

    const handleSortChange = (value, algData) => {
        switch (value) {
            case "Name":
                algData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Shortest":
                algData.sort((a, b) => a.name.localeCompare(b.name));
                algData.sort((a, b) => a.alg.length - b.alg.length);
                break;
            case "Longest":
                algData.sort((a, b) => a.name.localeCompare(b.name));
                algData.sort((a, b) => b.alg.length - a.alg.length);
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
                    className="px-3 py-2 rounded-xl bg-green-800 text-green-400 flex items-center text-base"
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
            <About open={showAbout} onClose={() => setShowAbout(false)} />
            <div className="flex justify-center mt-4">
                <div className=" rounded-xl overflow-hidden">
                    <table className="bg-gray-700 w-[95vw]">
                        <thead>
                            <tr className="bg-gray-800 rounded-t-xl lg:text-xl">
                                <th className="w-[10%] p-2">Name</th>
                                <th className="w-[10%] p-2">Case</th>
                                <th className="w-[60%] p-2">Algorithm</th>
                                <th className="w-[10%] p-2">Best Time</th>
                                <th className="w-[10%] p-2">Avg. Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((data, index) => (
                                    <TableItem key={index} data={data} />
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
