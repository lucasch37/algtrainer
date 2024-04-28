import React, { useEffect, useState } from "react";
import { AiFillQuestionCircle, AiOutlinePlus } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import AddAlgs from "./AddAlgs";
import TableItemMobile from "./TableItemMobile";
import Settings from "./Settings";
import About from "./About";

const TableMobile = () => {
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
        <div className="pb-8 lg:hidden">
            <div className="text-center font-semibold text-5xl mt-1">
                Algorithms
            </div>
            <div className="flex justify-center mt-3">
                <button
                    className="px-3 py-2 rounded-xl bg-green-800 text-green-400 flex items-center lg:text-base text-xs"
                    onClick={() => {
                        setShowAddMenu(true);
                    }}
                >
                    Add/Edit Algorithms
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
                    Help
                    <AiFillQuestionCircle className="lg:text-xl ml-1" />
                </button>
            </div>
            <AddAlgs open={showAddMenu} onClose={() => setShowAddMenu(false)} />
            <Settings
                open={showSettings}
                onClose={() => setShowSettings(false)}
            />
            <About open={showAbout} onClose={() => setShowAbout(false)} />
            <div className="flex justify-center">
                <div className="flex flex-col justify-center mt-3 w-[90vw]">
                    {data.map((data, index) => (
                        <TableItemMobile data={data} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableMobile;
