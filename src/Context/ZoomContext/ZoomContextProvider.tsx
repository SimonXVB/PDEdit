import { useState } from "react";
import { zoomContext } from "./zoomContext";

export function ZoomContextProvider({ children }: { children: React.ReactNode }) {
    const [zoomLevel, setZoomLevel] = useState<number>(1);

    return (
        <zoomContext.Provider value={{ zoomLevel, setZoomLevel }}>
            {children}
        </zoomContext.Provider>
    )
};