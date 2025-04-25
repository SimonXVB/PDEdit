import { createContext, Dispatch, SetStateAction } from "react";

interface ErrorInterface {
    errors: string[],
    setErrors: Dispatch<SetStateAction<string[]>>
};

export const errorContext = createContext<ErrorInterface>({} as ErrorInterface);