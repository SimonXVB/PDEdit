import { useContext, useEffect, useRef } from "react";
import { zoomContext } from "../../Context/ZoomContext/zoomContext";

export interface PDFPageInterface{
    pdfImg: string, 
    pdfCanvas: HTMLCanvasElement,
    pdfInfo: { height: number, width: number, rotation: number }
}

export function Canvas({ element }: { element: PDFPageInterface }) {
    const ref = useRef<HTMLDivElement>(null);
    const zoomCTX = useContext(zoomContext);
 
    useEffect(() => {
        const canvas = element.pdfCanvas!;

        ref.current!.innerHTML = "";
        canvas.className = "pdfCanvasEl";
        
        canvas.height = Math.floor(element.pdfInfo.height * zoomCTX.zoomLevel!);
        canvas.width = Math.floor(element.pdfInfo.width * zoomCTX.zoomLevel!);
        canvas.style.rotate = element.pdfInfo.rotation + "deg";

        ref.current!.appendChild(canvas);
    }, [element.pdfCanvas, element.pdfInfo, element.pdfInfo.height, element.pdfInfo.rotation, element.pdfInfo.width, zoomCTX.zoomLevel]);

    return <div ref={ref} className="absolute top-0 left-0 z-10"></div>
};