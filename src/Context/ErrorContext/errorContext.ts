import { createContext, Dispatch, SetStateAction } from "react";

interface ErrorInterface {
    error: string,
    setError: Dispatch<SetStateAction<string>>
};

export const errorContext = createContext<ErrorInterface>({} as ErrorInterface);