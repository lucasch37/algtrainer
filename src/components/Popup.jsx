import { useEffect } from "react";
import useScrollBlock from "../util/useScrollBlock";

const Popup = ({ open, children }) => {
    const [blockScroll, allowScroll] = useScrollBlock();

    useEffect(() => {
        if (open) {
            blockScroll();
        } else {
            allowScroll();
        }
    }, [open]);

    return (
        <div
            className={`
          fixed inset-0 flex justify-center items-center transition-colors z-10
          ${open ? "visible bg-black/50" : "invisible"}
        `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
            bg-gray-800 rounded-xl shadow-2xl transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
            >
                {children}
            </div>
        </div>
    );
};

export default Popup;
