import { useContext } from "react";
import { mainContext } from "../Context/MainCTX/mainContext";

enum zoomEnum {
    plus = "plus",
    minus = "minus"
};

export function useZoomPages() {
    const { zoomLevel, setZoomLevel } = useContext(mainContext);

    function zoomPages(zoom: "plus" | "minus") {
        if(zoom === zoomEnum.plus && zoomLevel < 2) {
            const newZoom = Number((zoomLevel + 0.05).toFixed(2))

            if(zoomLevel > 2) return;

            setZoomLevel(newZoom);
        } else if(zoom === zoomEnum.minus && zoomLevel > 0.2) {
            const newZoom = Number((zoomLevel - 0.05).toFixed(2))

            if(zoomLevel < 0.2) return;

            setZoomLevel(newZoom);
        };
    };

    function ctrlWheelZoom(e: WheelEvent) {
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