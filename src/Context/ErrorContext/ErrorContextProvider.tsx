import { useState } from "react"
import { errorContext } from "./errorContext";

export function ErrorContextProvider({ children }: { children: React.ReactNode }) {
    const [errors, setErrors] = useState<string[]>([]);

    return (
        <errorContext.Provider value={{ errors, setErrors }}>
            {children}
        </errorContext.Provider>
    );
};