import { useContext, useEffect, useRef } from "react";
import { zoomContext } from "../../Context/ZoomContext/zoomContext";
import { useDrawOnCanvas } from "../../Hooks/useDrawOnCanvas";

export interface PDFPageInterface {
    pdfImg: string, 
    pdfCanvas: HTMLCanvasElement,
    pdfInfo: { height: number, width: number, rotation: number }
}

export function Canvas({ page, index }: { page: PDFPageInterface, index: number }) {
    const zoomCTX = useContext(zoomContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { draw, startDraw, stopDraw } = useDrawOnCanvas();
 
    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");

        canvasRef.current!.width = Math.floor(page.pdfInfo.width * zoomCTX.zoomLevel);
        canvasRef.current!.height = Math.floor(page.pdfInfo.height * zoomCTX.zoomLevel);

        ctx?.clearRect(0, 0, page.pdfInfo.width, page.pdfInfo.height);
        ctx?.scale(zoomCTX.zoomLevel, zoomCTX.zoomLevel);
        ctx?.drawImage(page.pdfCanvas, 0, 0);
    }, [page.pdfCanvas, page.pdfInfo.height, page.pdfInfo.width, zoomCTX.zoomLevel]);

    return (
        <canvas ref={canvasRef} className="absolute top-0 left-0" 
            style={{
                rotate: page.pdfInfo?.rotation + "deg"
            }}
            onMouseDown={startDraw}
            onMouseUp={() => stopDraw(canvasRef.current!, index)}
            onMouseLeave={() => stopDraw(canvasRef.current!, index)}
            onMouseMove={e => draw(canvasRef.current!, e, index)}
        ></canvas>
    )
};