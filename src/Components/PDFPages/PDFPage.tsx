import { useContext, useEffect, useRef } from "react";
import { mainContext } from "../../Context/MainCTX/mainContext.ts";
import { PDFPagesInterface } from "../../Context/PDFCTX/pdfContext.ts";

export function PDFPage({ page, pageNum }: { page: PDFPagesInterface, pageNum: number }) {
    const { zoomLevel } = useContext(mainContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function getDimensions() {
        if(page.width > window.innerWidth) {
            if(page.width > page.height) {
                const width = (page.width - 50) * (window.innerWidth / page.height);
                const height = (page.height - 50) * (window.innerWidth / page.height);

                return [ width, height ];
            } else {
                const width = (page.width - 50) * (window.innerWidth / page.width);
                const height = (page.height - 50) * (window.innerWidth / page.width);

                return [ width, height ];
            };
        } else {
            return [ page.width, page.height ];
        };
    };

    useEffect(() => {
        const rotation = page.rotation;
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
    
            ctx!.rotate(page.rotation * (Math.PI / 180));
            ctx!.drawImage(img, -(width / 2), -(height / 2), width, height);
            ctx!.restore();
        };

        img.src = page.pdfImg;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.pdfImg, page.height, page.rotation, page.width, zoomLevel]);

    return (
        <div className="flex mx-auto mb-4">
            <p className="text-white text-lg bg-rose-500 h-fit p-2 rounded-l-xs font-bold">{pageNum}</p>
            <canvas className="border-2 border-gray-700" ref={canvasRef}></canvas>
        </div>
    )
};