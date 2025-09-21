import { useContext, useRef } from "react";
import { mainContext } from "../Context/MainCTX/mainContext";

enum zoomEnum {
    plus = "plus",
    minus = "minus"
};

export function useZoomPages() {
    const { setZoomLevel } = useContext(mainContext);

    const startDistance = useRef<number>(0);

    function zoomPages(zoom: "plus" | "minus") {
        setZoomLevel(prev => {
            if(zoom === zoomEnum.plus && prev < 2) {
                return Number((prev + 0.05).toFixed(2));
            } else if(zoom === zoomEnum.minus && prev > 0.2) {
                return Number((prev - 0.05).toFixed(2));
            } else {
                return prev;
            };
        });
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

    function getDistance(e: TouchEvent) {
        return Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
    };

    function startTouchZoom(e: TouchEvent) {
        if(e.touches.length === 2) {
            e.preventDefault();

            startDistance.current = getDistance(e);
        };
    };

    function touchZoom(e: TouchEvent) {
        if(e.touches.length === 2) {
            e.preventDefault();

            const newDistance = getDistance(e);
            const distanceThreshold = 10;

            if(!(newDistance > startDistance.current + distanceThreshold || newDistance < startDistance.current - distanceThreshold)) return;

            if(newDistance > startDistance.current) {
                zoomPages("plus");
            } else if(newDistance < startDistance.current) {
                zoomPages("minus");
            };

            startDistance.current = getDistance(e);
        };
    };

    return { zoomPages, ctrlWheelZoom, startTouchZoom, touchZoom }
};