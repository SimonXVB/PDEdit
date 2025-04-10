import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { zoomContext } from "../Context/ZoomContext/zoomContext";
import { drawingContext } from "../Context/DrawingContext/drawingContext";

export function useDrawOnCanvas() {
    const pdfCTX = useContext(pdfContext);
    const zoomCTX = useContext(zoomContext);
    const drawingCTX = useContext(drawingContext);

    let isDrawing: boolean = false;

    function startDraw() {
        isDrawing = true;
    };

    function stopDraw(currentCanvas: HTMLCanvasElement, index: number) {
        const mainCTX = pdfCTX.pdfPages[index].pdfCanvas.getContext("2d")!;
        const currentCTX = currentCanvas.getContext("2d")!;

        mainCTX.stroke();
        mainCTX.beginPath();

        currentCTX.stroke();
        currentCTX.beginPath();

        isDrawing = false;
    };
    
    function draw(currentCanvas: HTMLCanvasElement, e: React.MouseEvent, index: number) {
        if(!drawingCTX.drawingOptions.drawingEnabled || !isDrawing) return;

        const lineWidth = drawingCTX.drawingOptions.lineWidth;
        const color = drawingCTX.drawingOptions.color;

        const page = pdfCTX.pdfPages[index];
        const rotation: number = page.pdfInfo.rotation;

        const mainCTX = page.pdfCanvas.getContext("2d")!;
        const currentCTX = currentCanvas.getContext("2d")!;
        const rect = currentCanvas.getBoundingClientRect();

        const x = rotation === 180 ? page.pdfInfo.width - (e.clientX - rect.left) / zoomCTX.zoomLevel : (e.clientX - rect.left) / zoomCTX.zoomLevel;
        const y = rotation === 180 ? page.pdfInfo.height - (e.clientY - rect.top) / zoomCTX.zoomLevel : (e.clientY - rect.top) / zoomCTX.zoomLevel;
        
        if(color === "erase") {
            mainCTX.clearRect(x - (lineWidth / 2), y - (lineWidth / 2), lineWidth, lineWidth);
            currentCTX.clearRect(x - (lineWidth / 2), y - (lineWidth / 2), lineWidth, lineWidth);
        } else {
            mainCTX.lineWidth = lineWidth;
            mainCTX.strokeStyle = color;
            mainCTX.lineCap = 'round';
            mainCTX.lineJoin = "round"
            mainCTX.lineTo(x, y);
            mainCTX.stroke();
    
            currentCTX.lineWidth = lineWidth;
            currentCTX.strokeStyle = color;
            currentCTX.lineCap = "round";
            currentCTX.lineJoin = "round"
            currentCTX.lineTo(x, y);
            currentCTX.stroke();
        };
    };

    return { startDraw, stopDraw, draw };
}