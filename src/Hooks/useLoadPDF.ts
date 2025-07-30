import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { mainContext } from "../Context/MainCTX/mainContext";

export function useLoadPDF() {
    const { setPDFPages } = useContext(pdfContext);
    const { setError } = useContext(mainContext);

    async function loadPDF(url: string) {
        GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).toString();
        
        try {
            const pdf = await getDocument(url).promise;
    
            for(let i = 1; i <= pdf._pdfInfo.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
    
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
                const img = canvas.toDataURL("image/png");

                const pdfPage = {
                    pdfImg: img,
                    height: viewport.height,
                    width: viewport.width,
                    rotation: 360
                };

                setPDFPages(prev => [...prev, pdfPage]);
            };
        } catch (error) {
            setError("setURLError");
            console.error("An error occurred: ", error);
        };
    };

    return { loadPDF };
};