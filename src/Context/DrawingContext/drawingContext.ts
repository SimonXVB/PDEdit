import { createContext, Dispatch, SetStateAction } from "react";

export interface DrawingOptionsInterface {
    drawingEnabled: boolean,
    lineWidth: number,
    color: string
};

interface DrawingInterface {
    drawingOptions: DrawingOptionsInterface,
    setDrawingOptions: Dispatch<SetStateAction<DrawingOptionsInterface>>
};
 
export const drawingContext = createContext<DrawingInterface>({} as DrawingInterface);