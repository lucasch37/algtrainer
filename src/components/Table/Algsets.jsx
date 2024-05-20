import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const CreateNewPopup = ({ open, onClose }) => {
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
                <div className="bg-gray-700 h-fit flex overflow-y-scroll">
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
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="h-fit py-2 bg-gray-700 flex justify-end items-center border-t border-gray-400">
                    <div className="mr-2 flex items-center lg:text-base text-sm">
                        <div className="absolute left-2 text-red-400">
                            {errorText}
                        </div>
                        <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-red-800 text-red-200 rounded-lg lg:rounded-xl mr-1"
                            onClick={() => {
                                onClose();
                                setText("");
                                setErrorText("");
                                setPuzzle("3x3");
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

const Algsets = ({ open, onClose }) => {
    const [algsets, setAlgsets] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selected, setSelected] = useState();
    const [deleteMode, setDeleteMode] = useState(false);
    const [sortBy, setSortBy] = useState("Name");

    useEffect(() => {
        const algsets = JSON.parse(localStorage.getItem("algsets"));
        if (algsets) {
            setAlgsets(algsets);
        }
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            setSelected(algset);
        }
        if (localStorage.getItem("sortSetsBy")) {
            setSortBy(localStorage.getItem("sortSetsBy"));
            sortSets(
                localStorage.getItem("sortSetsBy"),
                JSON.parse(localStorage.getItem("algsets"))
            );
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("algset", JSON.stringify(selected));
        localStorage.setItem("algsets", JSON.stringify(algsets));
        onClose();
        window.location.reload();
    };

    const handleDelete = (algset) => {
        const updatedAlgsets = algsets.filter(
            (arrAlgset) => arrAlgset.name !== algset.name
        );
        setAlgsets(updatedAlgsets);
    };

    const sortSets = (value, algsets) => {
        switch (value) {
            case "Name":
                algsets.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Size":
                algsets.sort((a, b) => a.name.localeCompare(b.name));
                algsets.sort((a, b) => b.algs.length - a.algs.length);
                break;
        }
        setAlgsets(algsets);
    };

    const handleSortChange = (event) => {
        setSortBy(event);
        sortSets(event, JSON.parse(localStorage.getItem("algsets")));
        localStorage.setItem("sortSetsBy", event);
    };

    return (
        <Popup open={open}>
            <CreateNewPopup
                open={showPopup}
                onClose={() => setShowPopup(false)}
            />
            <div className="lg:w-[900px] w-[93vw] rounded-xl overflow-hidden flex flex-col">
                <div className="lg:text-3xl text-xl p-4 font-semibold ">
                    Algsets
                </div>
                <div className="bg-gray-700 lg:h-[500px] h-[60vh] flex overflow-y-scroll">
                    <div className="px-4 py-3 w-full">
                        <div className="flex flex-wrap items-center border-b border-gray-400 pb-2 mb-2">
                            <div className="font-semibold lg:text-2xl">
                                Algsets: {algsets.length}
                            </div>
                            <button
                                className="bg-green-800 text-green-400 px-3 py-1 rounded-xl ml-3 flex items-center lg:text-base text-sm"
                                onClick={() => setShowPopup(true)}
                            >
                                Create New
                                <AiOutlinePlus className="ml-1 lg:text-xl" />
                            </button>
                            <button
                                className={`${
                                    !deleteMode
                                        ? "bg-red-800 text-red-200"
                                        : "bg-red-300 text-red-800"
                                } px-3 py-1 rounded-xl ml-2 flex items-center lg:text-base text-sm`}
                                onClick={() => setDeleteMode((prev) => !prev)}
                            >
                                Delete
                                <AiOutlineClose className="ml-1 lg:text-xl" />
                            </button>
                            <div className="lg:ml-3">Sort By:</div>
                            <select
                                value={sortBy}
                                className="lg:p-1.5 p-1 lg:text-base text-sm text-center bg-gray-800 rounded-xl ml-1"
                                onChange={(e) =>
                                    handleSortChange(e.target.value)
                                }
                            >
                                <option value="Name">Name</option>
                                <option value="Size">Size</option>
                            </select>
                        </div>
                        <div>
                            {algsets.length > 0 ? (
                                algsets.map((algset, index) => (
                                    <div
                                        className={`w-full flex bg-[#283445] p-2 mt-2 rounded-xl items-center cursor-pointer relative ${
                                            selected.name === algset.name
                                                ? "lg:border-4 border-2 border-blue-500"
                                                : `lg:border-4 border-2 border-gray-600 ${
                                                      !deleteMode &&
                                                      "hover:border-gray-500"
                                                  }`
                                        }`}
                                        key={index}
                                        onClick={() => {
                                            if (!deleteMode) {
                                                setSelected(algset);
                                            }
                                        }}
                                    >
                                        <img
                                            src={`https://cubiclealgdbimagegen.azurewebsites.net/generator?&puzzle=${
                                                algset.puzzle === "3x3"
                                                    ? "3"
                                                    : "2"
                                            }&size=200&case=${
                                                algset.algs.length > 0
                                                    ? algset.algs[0]
                                                          .convertedAlg
                                                    : ""
                                            }`}
                                            alt="cube"
                                            className="w-[15%]"
                                        />
                                        <div className="ml-2 font-semibold text-xl lg:text-2xl">
                                            {algset.name}
                                        </div>
                                        <div className="absolute right-6 lg:text-lg text-x flex flex-col">
                                            {deleteMode &&
                                                JSON.parse(
                                                    localStorage.getItem(
                                                        "algset"
                                                    )
                                                ).name !== algset.name && (
                                                    <div
                                                        className="text-red-400 p-1 bg-red-800 rounded-xl flex justify-center"
                                                        onClick={() =>
                                                            handleDelete(algset)
                                                        }
                                                    >
                                                        <AiOutlineClose className="text-xl" />
                                                    </div>
                                                )}
                                            <div className="lg:text-base text-sm">
                                                <span className="font-semibold">
                                                    Algs:
                                                </span>{" "}
                                                {algset.algs.length}
                                            </div>
                                            <div className="lg:text-base text-sm">
                                                <span className="font-semibold">
                                                    Puzzle:
                                                </span>{" "}
                                                {algset.puzzle}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center text-gray-400 h-[400px] text-xl">
                                    No Algsets Added
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="h-fit py-2 bg-gray-700 flex justify-end items-center border-t border-gray-400">
                    <div className="mr-2 flex items-center lg:text-base text-sm">
                        <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-red-800 text-red-200 rounded-lg lg:rounded-xl mr-1"
                            onClick={() => {
                                onClose();
                                if (
                                    JSON.parse(localStorage.getItem("algsets"))
                                ) {
                                    setSelected(
                                        JSON.parse(
                                            localStorage.getItem("algset")
                                        )
                                    );
                                }
                                if (
                                    JSON.parse(localStorage.getItem("algsets"))
                                ) {
                                    setAlgsets(
                                        JSON.parse(
                                            localStorage.getItem("algsets")
                                        )
                                    );
                                }
                                setDeleteMode(false);
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

export default Algsets;
