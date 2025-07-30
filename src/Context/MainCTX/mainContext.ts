import { createContext, Dispatch, SetStateAction } from "react";

export interface MainInterface {
    error: string,
    setError: Dispatch<SetStateAction<string>>,
    zoomLevel: number,
    setZoomLevel: Dispatch<SetStateAction<number>>
};

export const mainContext = createContext<MainInterface>({} as MainInterface);