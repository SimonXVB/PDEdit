import { useState } from "react";
import { drawingContext, DrawingOptionsInterface } from "./drawingContext";

export function DrawingContextProvider({ children }: { children: React.ReactNode })  {
    const [drawingOptions, setDrawingOptions] = useState<DrawingOptionsInterface>({
        lineWidth: 1
    });

    return (
        <drawingContext.Provider value={{drawingOptions, setDrawingOptions}}>
            {children}
        </drawingContext.Provider>
    )
};