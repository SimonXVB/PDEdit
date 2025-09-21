import { useContext, useEffect, useRef, useState } from "react";
import { PDFPagesInterface } from "../../Context/PDFCTX/pdfContext";
import { mainContext } from "../../Context/MainCTX/mainContext";

export function RenderPage({page, i}: {page: PDFPagesInterface, i: number}) {
    const { zoomLevel } = useContext(mainContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [src, setSrc] = useState<string | undefined>(undefined);

    const prevRotation = useRef<number>(page.rotation);
    
    const is90Degs = page.rotation === 90 || page.rotation === 270;
    const ratio = is90Degs ? page.width / page.height : page.height / page.width;
    const width = window.innerWidth * 0.55;

    function getHeight() {
        if(prevRotation.current !== page.rotation) return;

        return (width * ratio) * zoomLevel;
    };

    useEffect(() => {
        prevRotation.current = page.rotation;

        (async function() {
            const canvas: HTMLCanvasElement = document.createElement("canvas");
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
            const viewport = page.pdfPage.getViewport({scale: 2, rotation: page.rotation});
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderParams = {
                canvasContext: ctx,
                canvas: canvas,
                viewport: viewport
            };
            
            await page.pdfPage.render(renderParams).promise;

            setSrc(canvas.toDataURL('image/png'));
            setLoading(false);
        })();
    }, [page.pdfPage, page.rotation]);
    
    return (
        <div className="relative mx-auto mb-4">
            {loading && <div className="absolute w-full h-full border-2 border-black shimmer"></div>}
            <img src={src} style={{height: getHeight(), maxWidth: width * zoomLevel, minWidth: width * zoomLevel}} className="border-2 border-black"/>
            <p className="text-black text-center text-lg font-bold" style={{padding: 8 * zoomLevel + "px"}}>{i + 1}</p>
        </div>
    );
};