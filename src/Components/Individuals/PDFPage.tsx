import { useContext, useEffect, useRef } from "react";
import { zoomContext } from "../../Context/ZoomContext/zoomContext.ts";
import { PDFPagesType } from "../../Context/PDFCTX/pdfContext.ts";

export function PDFPage({ el }: { el: PDFPagesType }) {
    const zoomCTX = useContext(zoomContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const rotation = el.pdfInfo.rotation;
        const ctx = canvasRef.current!.getContext("2d");

        const img = new Image();

        img.onload = () => {
            if(rotation === 90 || rotation === 270) {
                canvasRef.current!.height = (el.pdfInfo.width * zoomCTX.zoomLevel);
                canvasRef.current!.width = (el.pdfInfo.height * zoomCTX.zoomLevel);
    
                ctx!.save()
                ctx!.scale(zoomCTX.zoomLevel, zoomCTX.zoomLevel);
                ctx!.translate(el.pdfInfo.height / 2, el.pdfInfo.width / 2);
            } else {
                canvasRef.current!.height = (el.pdfInfo.height * zoomCTX.zoomLevel);
                canvasRef.current!.width = (el.pdfInfo.width * zoomCTX.zoomLevel);
    
                ctx!.save();
                ctx!.scale(zoomCTX.zoomLevel, zoomCTX.zoomLevel);
                ctx!.translate(el.pdfInfo.width / 2, el.pdfInfo.height / 2);
            };
    
            ctx!.rotate(el.pdfInfo.rotation * (Math.PI / 180));
            ctx!.drawImage(img, -(el.pdfInfo.width / 2), -(el.pdfInfo.height / 2), el.pdfInfo.width, el.pdfInfo.height);
            ctx!.restore();
        };

        img.src = el.pdfImg;
    }, [el.pdfImg, el.pdfInfo.height, el.pdfInfo.rotation, el.pdfInfo.width, zoomCTX.zoomLevel]);

    return (
        <div className="mx-auto mb-4 border-2 border-cyan-500" id={el.pdfID}>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
};