import { useState } from "react";
import { mainContext } from "./mainContext";

export function MainContextProvider({ children }: { children: React.ReactNode }) {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [error, setError] = useState("");

    return (
        <mainContext.Provider value={{ zoomLevel, setZoomLevel, error, setError }}>
            { children }
        </mainContext.Provider>
    )
};