import React, { useEffect, useState } from "react";
import { LuMove } from "react-icons/lu";
import "cubing/twisty";

const CasePanel = ({ scramble }) => {
    const [use3D, setUse3D] = useState();
    const [hideCase, setHideCase] = useState();
    const [puzzle, setPuzzle] = useState("3x3x3");

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("settings"))) {
            setUse3D(JSON.parse(localStorage.getItem("settings"))[0]);
            setHideCase(JSON.parse(localStorage.getItem("settings"))[4]);
        } else {
            setUse3D(true);
            setHideCase(false);
        }
        const algset = JSON.parse(localStorage.getItem("algset"));
        if (algset) {
            if (algset.puzzle === "2x2") {
                setPuzzle("2x2x2");
            }
        }
    });

    return (
        <div className="lg:h-[48.5%] h-[30vh] bg-gray-700 rounded-xl overflow-hidden flex flex-col relative">
            <div className="flex justify-center font-semibold text-xl bg-gray-800 p-1 items-center relative">
                Case
            </div>
            <div className="items-center flex-grow flex-col justify-center flex">
                {hideCase !== undefined &&
                    (!hideCase ? (
                        use3D !== undefined &&
                        (use3D ? (
                            <>
                                <div className="w-full h-[95%] lg:flex justify-center items-center -m-4 hidden">
                                    <twisty-player
                                        id="main-player"
                                        class="cube"
                                        visualization="PG3D"
                                        control-panel="none"
                                        background="none"
                                        puzzle={puzzle}
                                        experimental-setup-alg={
                                            "z2 " + scramble
                                        }
                                        tempo-scale="4"
                                        hint-facelets="none"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                                <div className="w-full h-[95%] flex justify-center items-center -m-4 lg:hidden">
                                    <twisty-player
                                        id="main-player"
                                        class="cube"
                                        puzzle={puzzle}
                                        visualization="PG3D"
                                        control-panel="none"
                                        background="none"
                                        experimental-setup-alg={
                                            "z2 " + scramble
                                        }
                                        tempo-scale="4"
                                        hint-facelets="none"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                        }}
                                    />
                                </div>
                                <div className="flex justify-center items-center h-[12%] mb-2 lg:text-base text-sm">
                                    Drag cube to view
                                    <LuMove className="ml-1" />
                                </div>
                            </>
                        ) : (
                            <div className="lg:w-full w-48 flex justify-center items-center">
                                <img
                                    src={`https://cubiclealgdbimagegen.azurewebsites.net/generator?&puzzle=${
                                        puzzle === "3x3x3" ? "3" : "2"
                                    }&size=200&alg=${"y2 " + scramble}`}
                                    alt="case"
                                    className="w-[75%]"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-400">Case Hidden</div>
                    ))}
            </div>
        </div>
    );
};

export default CasePanel;
