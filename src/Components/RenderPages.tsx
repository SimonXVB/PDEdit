import { useContext, useEffect, useRef, useState } from "react"
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { pdfRefsContext } from "../Context/PDFRefsContext/pdfRefsContext";

export function RenderPages({ url }: { url: string }) {
    const [ pageNum, setPageNum ] = useState<number>(0);
    const canvasRefs = useRef<HTMLCanvasElement[]>([]);
    const context = useContext(pdfRefsContext);

    async function loadPDF(): Promise<void> {
        if(!url || !canvasRefs.current ) return;

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

            const canvas: HTMLCanvasElement = canvasRefs.current[i - 1];

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

    useEffect(() => {
        context?.setPdfRefs(canvasRefs.current);
        loadPDF();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return (
        <div id="canvas-wrapper">
            {[...Array(pageNum).keys()].map(el => (
                <canvas key={el} ref={ref => {canvasRefs.current[el] = ref!}} className="border-4 border-gray-500" />
            ))}
        </div>
    )
};