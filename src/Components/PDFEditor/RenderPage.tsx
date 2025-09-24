import { useContext, useEffect, useState } from "react";
import { mainContext } from "../../Context/MainCTX/mainContext";
import { PDFPageProxy } from "pdfjs-dist";

export function RenderPage({page, i}: {page: PDFPageProxy, i: number}) {
    const { zoomLevel } = useContext(mainContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [src, setSrc] = useState<string | undefined>(undefined);

    const width = window.innerWidth * 0.55;
    
    useEffect(() => {
        (async function() {
            const viewport = page.getViewport({scale: 2});

            const canvas: HTMLCanvasElement = document.createElement("canvas");
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderParams = {
                canvasContext: ctx,
                canvas: canvas,
                viewport: viewport
            };
            
            await page.render(renderParams).promise;

            setSrc(canvas.toDataURL('image/png'));
            setLoading(false);
        })();
    }, [page]);
    
    return (
        <div className={`relative mx-auto mb-4 transition-all duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
            <img src={src} style={{minWidth: width * zoomLevel, maxWidth: width * zoomLevel}} className="border-2 border-black"/>
            <p className="text-black text-center text-lg font-bold" style={{padding: 8 * zoomLevel + "px"}}>{i + 1}</p>
        </div>
    );
};