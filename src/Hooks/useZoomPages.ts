import { useContext } from "react";
import { zoomContext } from "../Context/ZoomContext/zoomContext";

enum zoomEnum {
    plus = "plus",
    minus = "minus"
}

export function useZoomPages() {
    const zoomCTX = useContext(zoomContext);

    function zoomPages(zoom: "plus" | "minus") {
        if(zoom === zoomEnum.plus) {
            zoomCTX.setZoomLevel!(prev => prev + 0.1);
        } else if(zoom === zoomEnum.minus) {
            zoomCTX.setZoomLevel!(prev => prev - 0.1);
        };
    };

    return { zoomPages }
};