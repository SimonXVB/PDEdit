import { useContext, useEffect, useRef } from "react"
import { pdfRefsContext } from "../Context/PDFRefsContext/pdfRefsContext";
import { useLoadPDF } from "../Hooks/useLoadPDF";

export function RenderPages({ url }: { url: string }) {
    const canvasRefs = useRef<HTMLCanvasElement[]>([]);
    const context = useContext(pdfRefsContext);
    const { loadPDF, pageNum } = useLoadPDF();

    useEffect(() => {
        context.setPdfRefs!(canvasRefs.current);
        loadPDF(url, canvasRefs.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return (
        <div id="canvas-container">
            {[...Array(pageNum).keys()].map(i => (
                <canvas key={i} ref={ref => {canvasRefs.current[i] = ref!}} id={"canvas" + i} className="border-4 border-gray-500"/>
            ))}
        </div>
    )
};