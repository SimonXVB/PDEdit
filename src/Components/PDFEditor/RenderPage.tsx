import { useContext, useEffect, useRef } from "react";
import { PDFPagesInterface } from "../../Context/PDFCTX/pdfContext";
import { mainContext } from "../../Context/MainCTX/mainContext";

export function RenderPage({page, i}: {page: PDFPagesInterface, i: number}) {
    const { zoomLevel } = useContext(mainContext)

    const pageRef = useRef<HTMLImageElement>(null);

    const is90Degs = (page.rotation === 90 || page.rotation === 270);
    const ratio = is90Degs ? page.width / page.height : page.height / page.width;

    const width = window.innerWidth * 0.55;
    const height = (window.innerWidth * ratio) * 0.55;

    useEffect(() => {
        (async function() {
            const canvas: HTMLCanvasElement = document.createElement("canvas");
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

            const viewport = page.pdfPage.getViewport({scale: 1});
            const scale = is90Degs ? height / viewport.width : width / viewport.width;
            const scaledViewport = page.pdfPage.getViewport({scale: scale, rotation: page.rotation});
            
            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            const renderParams = {
                canvasContext: ctx,
                canvas: canvas,
                viewport: scaledViewport
            };
            
            await page.pdfPage.render(renderParams).promise;
            pageRef.current!.src = canvas.toDataURL('image/png');
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.pdfPage, page.rotation]);
    
    return (
        <div className="mx-auto mb-4">
            <img ref={pageRef} style={{height: (width * ratio) * zoomLevel, minWidth: width * zoomLevel}} className="border-2 rounded-lg border-black"/>
            <p className="text-black text-center h-fit p-2 font-semibold" style={{padding: 8 * zoomLevel + "px"}}>{i + 1}</p>
        </div>
    );
}