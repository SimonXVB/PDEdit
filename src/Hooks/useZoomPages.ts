import { useContext } from "react";
import { zoomContext } from "../Context/ZoomContext/zoomContext";

enum zoomEnum {
    plus = "plus",
    minus = "minus"
}

export function useZoomPages() {
    const zoomCTX = useContext(zoomContext);

    function zoomPages(zoom: "plus" | "minus"): void {
        if(zoom === zoomEnum.plus && zoomCTX.zoomLevel < 2) {
            zoomCTX.setZoomLevel(prev => Number((prev + 0.1).toFixed(2)));
        } else if(zoom === zoomEnum.minus && zoomCTX.zoomLevel > 0.2) {
            zoomCTX.setZoomLevel(prev => Number((prev - 0.1).toFixed(2)));
        };
    };

    function ctrlWheelZoom(e: WheelEvent): void {
        if(e.ctrlKey) {
            e.preventDefault();

            if(e.deltaY < 0) {
                zoomPages("plus");
            } else {
                zoomPages("minus");
            };
        };
    };

    return { zoomPages, ctrlWheelZoom }
};