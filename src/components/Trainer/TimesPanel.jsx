import React, { useEffect, useRef, useState } from "react";
import formatTime from "../../util/formatTime";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import convertAlg from "../../util/convertAlg";

const TimesPanel = ({ times, setSavedTimes }) => {
    const [selectedTime, setSelectedTime] = useState();

    const bottomRef = useRef(null);
    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 0);
    }, [times]);

    const deleteTime = (time) => {
        const updatedTimes = [...times];
        updatedTimes.splice(times.indexOf(time), 1);
        setSavedTimes(updatedTimes);
        localStorage.setItem("times", JSON.stringify(updatedTimes));
        setSelectedTime();
    };

    return (
        <div className="lg:h-[48.5%] h-[30vh] bg-gray-700 rounded-xl overflow-hidden flex flex-col">
            <div className="flex justify-center font-semibold text-xl bg-gray-800 p-1 items-center">
                Times
            </div>
            {selectedTime ? (
                <div className="flex flex-col flex-grow items-center relative overflow-y-scroll">
                    <button
                        className="absolute top-2 left-2 bg-gray-400 p-1 rounded-lg lg:p-2"
                        onClick={() => {
                            setSelectedTime();
                            setTimeout(() => {
                                scrollToBottom();
                            }, 0);
                        }}
                    >
                        <IoArrowBackOutline />
                    </button>
                    <button
                        className="absolute top-2 right-2 bg-red-500 p-1 rounded-lg lg:p-2"
                        onClick={() => deleteTime(selectedTime)}
                    >
                        <AiOutlineClose />
                    </button>
                    <div className="mt-2 lg:text-2xl font-semibold">
                        {selectedTime.name}
                    </div>
                    <div className="lg:text-xl">
                        Time: {formatTime(selectedTime.time)}
                    </div>
                    <div className="flex flex-col lg:items-stretch items-center lg:flex-row lg:flex-grow m-2 mt-1">
                        <img
                            src={`https://cubiclealgdbimagegen.azurewebsites.net/generator?&puzzle=3&size=200&alg=${
                                "y2 " + selectedTime.scramble
                            }`}
                            alt={selectedTime.name}
                            className="w-[40%] border-2 border-gray-400 rounded-xl mr-2"
                        />
                        <div className="text-center border-2 border-gray-400 rounded-xl flex flex-col justify-center items-center">
                            <div>
                                <div className="font-semibold">Scramble:</div>
                                <div className="text-center lg:text-sm text-xs px-2">
                                    {selectedTime.scramble}
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold mt-1">
                                    Algorithm:
                                </div>
                                <div className="text-center lg:text-sm text-xs px-2">
                                    {selectedTime.alg}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : times.length > 0 ? (
                <>
                    <div className="flex justify-center font-bold my-1 lg:text-base text-sm">
                        Total: {times.length}
                    </div>
                    <div className="flex flex-wrap justify-center lg:m-2 lg:mt-0 overflow-y-scroll">
                        {times.map((time, index) => (
                            <button
                                key={index}
                                className="lg:py-1 w-[20%] text-center lg:text-base text-xs lg:m-1 lg:rounded-lg m-0.5 rounded py-1 bg-gray-400"
                                onClick={() => setSelectedTime(time)}
                            >
                                {formatTime(time.time)}
                            </button>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </>
            ) : (
                <div className="flex flex-grow justify-center items-center">
                    <div className="text-gray-400 items-center flex h-full">
                        No Times Recorded
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimesPanel;
