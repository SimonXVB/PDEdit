import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useLoadPDF() {
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
            const pdf = getDocument(url);
            const loadedPDF = await pdf.promise;
            const pdfArray = [];
    
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

                const pdfCanvas = document.createElement("canvas");
                pdfCanvas.style.width = Math.floor(viewport.width) + "px";
                pdfCanvas.style.height = Math.floor(viewport.height) + "px";
        
                await page.render(renderContext).promise;

                //Evaluates whether an element at the given index is present. If an element is present, returns the object with same canvas and updated image.
                if(context.pdfPages![i - 1]) {
                    pdfArray.push({
                        pdfImg: canvas.toDataURL("image/png"),
                        pdfCanvas: context.pdfPages![i - 1].pdfCanvas
                    });
                } else {
                    pdfArray.push({
                        pdfImg: canvas.toDataURL("image/png"),
                        pdfCanvas: pdfCanvas
                    });
                };
            };

            context.setPDFPages!(pdfArray);
            context.setPDFLoading!(false);
        } catch (error) {
            context.setPDFLoading!(false);
            errContext.setErrors!(prev => [...prev, "setURLError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { loadPDF };
};