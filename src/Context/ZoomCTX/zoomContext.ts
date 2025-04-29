import { createContext, Dispatch, SetStateAction } from "react";

interface ZoomInterface {
    zoomLevel: number,
    setZoomLevel: Dispatch<SetStateAction<number>>
};

export const zoomContext = createContext<ZoomInterface>({} as ZoomInterface);