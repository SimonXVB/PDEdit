import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useState } from "react";

export function useLoadPDF() {
    const [pageNum, setPageNum] = useState<number>(0);

    async function loadPDF(url: string, canvasRefs: HTMLCanvasElement[]): Promise<void> {
        if(!url || !canvasRefs ) return;

        GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).toString();
        
        const pdf = getDocument(url);
        const loadedPDF = await pdf.promise;
        setPageNum(loadedPDF._pdfInfo.numPages);

        for(let i = 1; i <= loadedPDF._pdfInfo.numPages; i++) {
            const page = await loadedPDF.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 });

            const canvas: HTMLCanvasElement = canvasRefs[i - 1];
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
            if(ctx === null) return;
            
            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);
            canvas.style.width = Math.floor(viewport.width) + "px";
            canvas.style.height =  Math.floor(viewport.height) + "px";
    
            const  renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
    
            page.render(renderContext);
        };
    };

    return { loadPDF, pageNum };
};