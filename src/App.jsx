import { useState } from "react";
import Table from "./components/Table/Table";
import Trainer from "./components/Trainer/Trainer";

const App = () => {
    const [view, setView] = useState("Algs");
    return (
        <div>
            <div className="flex justify-center mt-4 underline-offset-2">
                <div
                    className={`text-2xl text-center pr-2 border-r-2 mr-2 cursor-pointer ${
                        view === "Algs"
                            ? "underline"
                            : "hover:underline decoration-gray-400"
                    }`}
                    onClick={() => setView("Algs")}
                >
                    Algs
                </div>
                <div
                    className={`text-2xl text-center cursor-pointer ${
                        view === "Trainer"
                            ? "underline"
                            : "hover:underline decoration-gray-400"
                    }`}
                    onClick={() => setView("Trainer")}
                >
                    Trainer
                </div>
            </div>
            {view === "Algs" ? <Table /> : <Trainer />}
        </div>
    );
};

export default App;
