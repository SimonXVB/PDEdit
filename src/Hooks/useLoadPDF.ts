import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useContext } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { errorContext } from "../Context/ErrorContext/errorContext";

export function useLoadPDF() {
    const pdfCTX = useContext(pdfContext);
    const errorCTX = useContext(errorContext);

    async function loadPDF(url: string): Promise<void> {
        if(!url) return;

        pdfCTX.setPDFLoading!(true);

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
                
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const  renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };

                const pdfCanvas = document.createElement("canvas");
                pdfCanvas.width = viewport.width;
                pdfCanvas.height = viewport.height;
                
                await page.render(renderContext).promise;

                //Evaluates whether an element at the given index is present. If an element is present, returns the object with same canvas and updated image.
                if(pdfCTX.pdfPages![i - 1]) {
                    pdfArray.push({
                        pdfImg: canvas.toDataURL("image/png"),
                        pdfCanvas: pdfCTX.pdfPages![i - 1].pdfCanvas,
                        originalSize: { 
                            width: pdfCTX.pdfPages![i - 1].originalSize!.width, 
                            height: pdfCTX.pdfPages![i - 1].originalSize!.height
                        }
                    });
                } else {
                    pdfArray.push({
                        pdfImg: canvas.toDataURL("image/png"),
                        pdfCanvas: pdfCanvas,
                        originalSize: { 
                            width: viewport.width, 
                            height: viewport.height
                        }
                    });
                };
            };

            pdfCTX.setPDFPages!(pdfArray);
            pdfCTX.setPDFLoading!(false);
        } catch (error) {
            pdfCTX.setPDFLoading!(false);
            errorCTX.setErrors!(prev => [...prev, "setURLError"]);
            console.error("An error occurred: ", error);
        }
    };

    return { loadPDF };
};