import { useEffect, useState } from "react";
import Table from "./components/Table/Table";
import Trainer from "./components/Trainer/Trainer";
import TableMobile from "./components/Table/TableMobile";
import TrainerMobile from "./components/Trainer/TrainerMobile";

const App = () => {
    const [view, setView] = useState("Algs");

    useEffect(() => {
        const savedView = localStorage.getItem("view");
        if (savedView) {
            setView(savedView);
        }
    }, []);

    return (
        <div>
            <div className="flex justify-center mt-4 underline-offset-2">
                <div
                    className={`text-2xl text-center pr-2 border-r-2 mr-2 cursor-pointer ${
                        view === "Algs"
                            ? "underline"
                            : "hover:underline decoration-gray-400"
                    }`}
                    onClick={() => {
                        setView("Algs");
                        localStorage.setItem("view", "Algs");
                    }}
                >
                    Algs
                </div>
                <div
                    className={`text-2xl text-center cursor-pointer ${
                        view === "Trainer"
                            ? "underline"
                            : "hover:underline decoration-gray-400"
                    }`}
                    onClick={() => {
                        setView("Trainer");
                        localStorage.setItem("view", "Trainer");
                    }}
                >
                    Trainer
                </div>
            </div>
            {view === "Algs" ? (
                <>
                    <Table />
                    <TableMobile />
                </>
            ) : (
                <>
                    <TrainerMobile />
                    <Trainer />
                </>
            )}
        </div>
    );
};

export default App;
