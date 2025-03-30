import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useContext, useState } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useLoadPDF() {
    const [pdfImgs, setPDFImgs] = useState<string[]>([]);

    const context = useContext(pdfContext);
    const errContext = useContext(errorContext);

    async function loadPDF(url: string): Promise<void> {
        if(!url) return;

        context.setPDFLoading!(true);

        GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).toString();
        
        try {
            const imgs = [];

            const pdf = getDocument(url);
            const loadedPDF = await pdf.promise;
    
            for(let i = 1; i <= loadedPDF._pdfInfo.numPages; i++) {
                const page = await loadedPDF.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
    
                const canvas: HTMLCanvasElement = document.createElement("canvas");
                const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
                
                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
    
                const  renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
        
                await page.render(renderContext).promise;
                imgs.push(canvas.toDataURL("image/png"));
            };
    
            setPDFImgs(imgs);
            context.setPDFLoading!(false);
        } catch (error) {
            context.setPDFLoading!(false);
            errContext.setErrors!(prev => [...prev, "setURLError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { loadPDF, pdfImgs };
};