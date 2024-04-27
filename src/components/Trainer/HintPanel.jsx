import React, { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const HintPanel = ({ alg }) => {
    const [hints, setHints] = useState(0);
    const [showAlg, setShowAlg] = useState();

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("settings"))) {
            setShowAlg(JSON.parse(localStorage.getItem("settings"))[2]);
        } else {
            setShowAlg(false);
        }
    });

    useEffect(() => {
        setHints(0);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [alg]);

    const updateHints = (increment) => {
        if (increment > 0) {
            setHints((prev) => {
                return prev + increment <= alg.split(" ").length
                    ? prev + increment
                    : prev;
            });
        } else if (increment < 0) {
            setHints((prev) => {
                return prev + increment >= 0 ? prev + increment : prev;
            });
        }
    };

    const handleKeyDown = (event) => {
        if (event.code === "ArrowRight" && alg !== "") {
            updateHints(1);
        } else if (event.code === "ArrowLeft" && alg !== "") {
            updateHints(-1);
        }
    };

    return (
        <>
            {!showAlg ? (
                <div className="lg:h-[48.5%] h-[30vh] bg-gray-700 rounded-xl overflow-hidden flex flex-col relative">
                    <div className="flex justify-center font-semibold text-xl bg-gray-800 p-1 items-center">
                        Hint
                    </div>
                    <div className="text-center flex-grow flex items-center p-6">
                        {hints === 0 ? (
                            <>
                                <div className="text-gray-400 lg:block hidden">
                                    Press or hold right arrow key to view hints!
                                </div>
                            </>
                        ) : (
                            <div className="justify-center flex w-full lg:text-xl">
                                {alg.split(" ").slice(0, hints).join(" ")}
                            </div>
                        )}
                    </div>
                    <div className="lg:hidden absolute bottom-2 flex justify-center w-full">
                        <button
                            className="text-xl bg-gray-400 p-0.5 rounded"
                            onClick={() => updateHints(-1)}
                        >
                            <IoMdArrowDropleft />
                        </button>
                        <button
                            className="text-xl bg-gray-400 p-0.5 rounded ml-2"
                            onClick={() => updateHints(1)}
                        >
                            <IoMdArrowDropright />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="lg:h-[48.5%] h-[30vh] bg-gray-700 rounded-xl overflow-hidden flex flex-col">
                    <div className="flex justify-center font-semibold text-xl bg-gray-800 p-1 items-center">
                        Algorithm
                    </div>
                    <div className=" text-center flex-grow items-center p-6 justify-center flex w-full lg:text-xl">
                        {alg}
                    </div>
                </div>
            )}
        </>
    );
};

export default HintPanel;
