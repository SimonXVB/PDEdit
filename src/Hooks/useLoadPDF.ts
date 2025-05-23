import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { errorContext } from "../Context/ErrorCTX/errorContext";

export function useLoadPDF() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function loadPDF(url: string) {
        GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).toString();
        
        try {
            const pdf = getDocument(url);
            const loadedPDF = await pdf.promise;
    
            for(let i = 1; i <= loadedPDF._pdfInfo.numPages; i++) {
                const page = await loadedPDF.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
    
                const canvas: HTMLCanvasElement = document.createElement("canvas");
                const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
                
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const  renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                await page.render(renderContext).promise;
                const img = canvas.toDataURL("image/png");

                const pdfPage = {
                    pdfImg: img,
                    pdfInfo: {
                        height: viewport.height,
                        width: viewport.width,
                        rotation: 360
                    }
                };

                pdfCTX.setPDFPages(prev => [...prev, pdfPage]);
            };
        } catch (error) {
            errorCTX.setError("setURLError");
            console.error("An error occurred: ", error);
        };
    };

    return { loadPDF };
};