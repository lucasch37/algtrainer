import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import { FaGithub } from "react-icons/fa";

const About = ({ open, onClose }) => {
    return (
        <Popup open={open}>
            <div className="lg:w-[900px] w-[93vw] rounded-xl overflow-hidden">
                <div className="lg:text-3xl text-xl p-4 font-semibold ">
                    About
                </div>
                <div className="bg-gray-700 lg:h-fit h-[60vh] flex overflow-y-scroll">
                    <div className="px-4 py-3">
                        <div className="font-bold text-xl">About</div>
                        <div>
                            This website was made by Lucas Chen. I've been
                            cubing since 2020 and currently average around 9-10
                            seconds on 3x3. I've memorized hundreds of
                            algorithms in my time cubing, and I made to this
                            website to help speed up that process.
                        </div>
                        <div className="flex">
                            <a
                                className="flex items-center text-blue-500 underline mb-4"
                                href="https://www.worldcubeassociation.org/persons/2022CHEN24"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                My WCA Profile
                                <img
                                    src="/Rubiks-Cube-AlgTrainer/WCA_Logo.png"
                                    alt=""
                                    className="w-6 ml-1"
                                />
                            </a>
                            <a
                                className="flex items-center text-blue-500 underline mb-4 ml-2"
                                href="https://github.com/lucasch37"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Github
                                <FaGithub className="ml-1 text-white text-2xl" />
                            </a>
                        </div>
                        <div className="text-xl font-bold">Special Thanks</div>
                        <ul className="list-disc ml-4">
                            <li>
                                Lucas Garron and the creators of CubingJS for{" "}
                                <a
                                    href="https://js.cubing.net/cubing/twisty/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-500"
                                >
                                    Twisty Player
                                </a>
                                , used to display scrambles in an amazing way
                            </li>
                            <li>
                                Conrad Rider for{" "}
                                <a
                                    href="http://cube.rider.biz/visualcube.php"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-500"
                                >
                                    VisualCube
                                </a>
                                , used to generate images for every algorithm
                            </li>
                            <li>
                                Chen Shuang for{" "}
                                <a
                                    href="https://github.com/cs0x7f/min2phase"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-500"
                                >
                                    min2phase
                                </a>
                                , used to generate scrambles in less than half a
                                second
                            </li>
                        </ul>
                        {/* <div className="text-xl font-bold mt-4">Changelog</div>
                        <ul className="ml-4 list-disc pb-2">
                            <li>
                                Version 1.2 (May 18, 2024)
                                <ul className="list-disc list-inside ml-2">
                                    <li>Fixed several bugs</li>
                                    <li>
                                        Added algsets!{" "}
                                        <ul className="ml-4 list-disc list-inside text-sm">
                                            <li>
                                                Allow for better organizing of
                                                algs
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Added support for 2x2</li>
                                    <li>
                                        Added more sorting options (best time,
                                        avg time, and more)
                                    </li>
                                    <li>
                                        Added arrows on table to make sorting
                                        easier
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Version 1.1 (May 5, 2024)
                                <ul className="list-disc list-inside ml-2">
                                    <li>Fixed several bugs</li>
                                    <li>
                                        Added "Hide Case" setting to help train
                                        case recognition
                                    </li>
                                    <li>Added time counter</li>
                                    <li>
                                        Viewing past time now also displays
                                        algorithm
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Version 1.0 (May 4, 2024)
                                <ul className="list-disc list-inside ml-2">
                                    <li>Released</li>
                                </ul>
                            </li>
                        </ul> */}
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
