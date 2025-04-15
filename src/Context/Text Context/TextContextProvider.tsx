import { useState } from "react";
import { textContext, TextOptionsInterface } from "./textContext";

export function TextContextProvider({ children }: { children: React.ReactNode }) {
    const [textOptions, setTextOptions] = useState<TextOptionsInterface>({
        font: "Helvetica",
        size: 25,
        color: "#000000"
    });

    return (
        <textContext.Provider value={{ textOptions, setTextOptions }}>
            {children}
        </textContext.Provider>
    )
};