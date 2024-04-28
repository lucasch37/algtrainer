import React, { useEffect, useState } from "react";
import Popup from "../Popup";

const About = ({ open, onClose }) => {
    return (
        <Popup open={open}>
            <div className="lg:w-[900px] w-[93vw] rounded-xl overflow-hidden">
                <div className="lg:text-3xl text-xl p-4 font-semibold ">
                    About
                </div>
                <div className="bg-gray-700 h-fit flex overflow-y-scroll">
                    <div className="px-4 py-3">
                        <div>
                            This website was made by Lucas Chen. I've been
                            cubing since 2020 and currently average around 9-10
                            seconds on 3x3. I've memorized hundreds of
                            algorithms in my time cubing, and I made to this
                            website to help speed up that process.
                        </div>
                        <a
                            className="flex items-center text-blue-500 underline my-4"
                            href="https://www.worldcubeassociation.org/persons/2022CHEN24"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            My WCA Profile
                            <img
                                src="/Rubiks-Cube-AlgTrainer/WCA_Logo.png"
                                alt=""
                                className="w-8 ml-2"
                            />
                        </a>
                        <div className="">Special Thanks to:</div>
                        <ul className="list-disc ml-4">
                            <li>
                                <span className="font-bold">Lucas Garron</span>{" "}
                                for{" "}
                                <a
                                    href="https://js.cubing.net/cubing/twisty/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-500"
                                >
                                    Twisty Player
                                </a>
                            </li>
                            <li>
                                <span className="font-bold">Conrad Rider</span>{" "}
                                for{" "}
                                <a
                                    href="http://cube.rider.biz/visualcube.php"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-500"
                                >
                                    VisualCube
                                </a>
                            </li>
                            <li>
                                <span className="font-bold">Chen Shuang</span>{" "}
                                for{" "}
                                <a
                                    href="https://github.com/cs0x7f/min2phase"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-500"
                                >
                                    min2phase
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="h-fit py-2 bg-gray-700 flex justify-end items-center border-t border-gray-400">
                    <div className="mr-2 flex items-center lg:text-base text-sm">
                        <button
                            className="lg:px-4 lg:py-2 px-2 py-1 bg-red-800 text-red-200 rounded-lg lg:rounded-xl mr-1"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default About;
