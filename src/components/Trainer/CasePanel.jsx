import React from "react";
import { LuMove } from "react-icons/lu";
import "cubing/twisty";
import { IoIosSettings } from "react-icons/io";

const CasePanel = ({ scramble }) => {
    return (
        <div className="h-[48.5%] bg-gray-700 rounded-xl overflow-hidden flex flex-col relative">
            <div className="flex justify-center font-semibold text-xl bg-gray-800 p-1 items-center relative">
                Case
            </div>
            <div className="items-center flex-grow flex-col justify-center flex">
                <div className="w-full h-[95%] flex items-center -m-4 ">
                    <twisty-player
                        id="main-player"
                        class="cube"
                        visualization="PG3D"
                        control-panel="none"
                        background="none"
                        experimental-setup-alg={"z2 " + scramble}
                        tempo-scale="4"
                        hint-facelets="none"
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
                <div className="flex justify-center items-center h-[12%] mb-2">
                    Drag cube to view
                    <LuMove className="ml-1" />
                </div>
            </div>
        </div>
    );
};

export default CasePanel;
