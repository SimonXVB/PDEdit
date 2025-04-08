import { useContext, useEffect, useRef } from "react";
import { zoomContext } from "../../Context/ZoomContext/zoomContext";
import { useDrawOnCanvas } from "../../Hooks/useDrawOnCanvas";

export interface PDFPageInterface{
    pdfImg: string, 
    pdfCanvas: HTMLCanvasElement,
    pdfInfo: { height: number, width: number, rotation: number }
}

export function Canvas({ el, index }: { el: PDFPageInterface, index: number }) {
    const zoomCTX = useContext(zoomContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { draw, startDraw, stopDraw } = useDrawOnCanvas();
 
    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");

        canvasRef.current!.width = Math.floor(el.pdfInfo.width * zoomCTX.zoomLevel!);
        canvasRef.current!.height = Math.floor(el.pdfInfo.height * zoomCTX.zoomLevel!);

        ctx?.clearRect(0, 0, el.pdfInfo.width, el.pdfInfo.height);
        ctx?.scale(zoomCTX.zoomLevel!, zoomCTX.zoomLevel!);
        ctx?.drawImage(el.pdfCanvas, 0, 0);
    }, [el.pdfCanvas, el.pdfInfo.height, el.pdfInfo.width, zoomCTX.zoomLevel]);

    return (
        <canvas ref={canvasRef} className="absolute top-0 left-0 z-10" 
            style={{
                rotate: el.pdfInfo?.rotation + "deg"
            }}
            onMouseDown={startDraw}
            onMouseUp={() => stopDraw(canvasRef.current!, index)}
            onMouseLeave={() => stopDraw(canvasRef.current!, index)}
            onMouseMove={e => draw(canvasRef.current!, e, index)}
        ></canvas>
    )
};