import { useContext, useEffect, useRef } from "react";
import { zoomContext } from "../../Context/ZoomContext/zoomContext.ts";
import { PDFPagesType } from "../../Context/PDFCTX/pdfContext.ts";

export function PDFPage({ el }: { el: PDFPagesType }) {
    const zoomCTX = useContext(zoomContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function getDimensions() {
        if(el.pdfInfo.width > window.innerWidth) {
            if(el.pdfInfo.width > el.pdfInfo.height) {
                const width = (el.pdfInfo.width - 50) * (window.innerWidth / el.pdfInfo.height);
                const height = (el.pdfInfo.height - 50) * (window.innerWidth / el.pdfInfo.height);

                return [ width, height ];
            } else {
                const width = (el.pdfInfo.width - 50) * (window.innerWidth / el.pdfInfo.width);
                const height = (el.pdfInfo.height - 50) * (window.innerWidth / el.pdfInfo.width);

                return [ width, height ];
            };
        } else {
            return [ el.pdfInfo.width, el.pdfInfo.height ];
        };
    };

    useEffect(() => {
        const rotation = el.pdfInfo.rotation;
        const ctx = canvasRef.current!.getContext("2d");

        const img = new Image();

        img.onload = () => {
            const [ width, height ] = getDimensions();

            if(rotation === 90 || rotation === 270) {
                canvasRef.current!.height = (width * zoomCTX.zoomLevel);
                canvasRef.current!.width = (height * zoomCTX.zoomLevel);
    
                ctx!.save()
                ctx!.scale(zoomCTX.zoomLevel, zoomCTX.zoomLevel);
                ctx!.translate(height / 2, width / 2);
            } else {
                canvasRef.current!.height = (height * zoomCTX.zoomLevel);
                canvasRef.current!.width = (width * zoomCTX.zoomLevel);
    
                ctx!.save();
                ctx!.scale(zoomCTX.zoomLevel, zoomCTX.zoomLevel);
                ctx!.translate(width / 2, height / 2);
            };
    
            ctx!.rotate(el.pdfInfo.rotation * (Math.PI / 180));
            ctx!.drawImage(img, -(width / 2), -(height / 2), width, height);
            ctx!.restore();
        };

        img.src = el.pdfImg;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [el.pdfImg, el.pdfInfo.height, el.pdfInfo.rotation, el.pdfInfo.width, zoomCTX.zoomLevel]);

    return (
        <div className="mx-auto mb-4 border-2 border-cyan-500">
            <canvas ref={canvasRef}></canvas>
        </div>
    )
};