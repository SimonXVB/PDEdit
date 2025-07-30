import { useContext, useEffect, useRef } from "react";
import { mainContext } from "../../../Context/MainCTX/mainContext.ts";
import { PDFPagesInterface } from "../../../Context/PDFCTX/pdfContext.ts";

export function PDFPage({ el }: { el: PDFPagesInterface }) {
    const { zoomLevel } = useContext(mainContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function getDimensions() {
        if(el.width > window.innerWidth) {
            if(el.width > el.height) {
                const width = (el.width - 50) * (window.innerWidth / el.height);
                const height = (el.height - 50) * (window.innerWidth / el.height);

                return [ width, height ];
            } else {
                const width = (el.width - 50) * (window.innerWidth / el.width);
                const height = (el.height - 50) * (window.innerWidth / el.width);

                return [ width, height ];
            };
        } else {
            return [ el.width, el.height ];
        };
    };

    useEffect(() => {
        const rotation = el.rotation;
        const ctx = canvasRef.current!.getContext("2d");

        const img = new Image();

        img.onload = () => {
            const [ width, height ] = getDimensions();

            if(rotation === 90 || rotation === 270) {
                canvasRef.current!.height = (width * zoomLevel);
                canvasRef.current!.width = (height * zoomLevel);
    
                ctx!.save()
                ctx!.scale(zoomLevel, zoomLevel);
                ctx!.translate(height / 2, width / 2);
            } else {
                canvasRef.current!.height = (height * zoomLevel);
                canvasRef.current!.width = (width * zoomLevel);
    
                ctx!.save();
                ctx!.scale(zoomLevel, zoomLevel);
                ctx!.translate(width / 2, height / 2);
            };
    
            ctx!.rotate(el.rotation * (Math.PI / 180));
            ctx!.drawImage(img, -(width / 2), -(height / 2), width, height);
            ctx!.restore();
        };

        img.src = el.pdfImg;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [el.pdfImg, el.height, el.rotation, el.width, zoomLevel]);

    return (
        <div className="mx-auto mb-4 border-2 border-cyan-500">
            <canvas ref={canvasRef}></canvas>
        </div>
    )
};