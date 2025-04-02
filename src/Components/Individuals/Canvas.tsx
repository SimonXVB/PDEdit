import { useEffect, useRef } from "react";

export function Canvas({ canvasElement, ogSize, zoomLevel }: { canvasElement: HTMLCanvasElement, ogSize: { height: number, width: number }, zoomLevel: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current!.innerHTML = "";
        canvasElement.className = "pdfCanvasEl";
        
        canvasElement.height = ogSize.height * zoomLevel;
        canvasElement.width = ogSize.width * zoomLevel;

        ref.current!.appendChild(canvasElement);
    }, [canvasElement, ogSize, zoomLevel]);

    return <div ref={ref} className="absolute top-0 left-0 z-10"></div>
};