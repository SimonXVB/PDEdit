import { createContext, Dispatch, SetStateAction } from "react";

export interface DrawingOptionsInterface {
    lineWidth: number
};

interface DrawingInterface {
    drawingOptions?: DrawingOptionsInterface,
    setDrawingOptions?: Dispatch<SetStateAction<DrawingOptionsInterface>>
};
 
export const drawingContext = createContext<DrawingInterface>({});