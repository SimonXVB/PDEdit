import { createContext, Dispatch, SetStateAction } from "react";

export interface TextOptionsInterface {
    font: string,
    size: number,
    color: string
};

interface TextInterface {
    textOptions: TextOptionsInterface,
    setTextOptions: Dispatch<SetStateAction<TextOptionsInterface>>
};

export const textContext = createContext<TextInterface>({} as TextInterface);