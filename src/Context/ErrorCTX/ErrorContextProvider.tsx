import { useState } from "react"
import { errorContext } from "./errorContext";

export function ErrorContextProvider({ children }: { children: React.ReactNode }) {
    const [error, setError] = useState<string>("");

    return (
        <errorContext.Provider value={{ error, setError }}>
            {children}
        </errorContext.Provider>
    );
};