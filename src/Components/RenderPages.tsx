import { useContext, useEffect, useRef } from "react"
import { pdfRefsContext } from "../Context/PDFRefsContext/pdfRefsContext";
import { useRemovePage } from "../Hooks/useRemovePage";
import { useLoadPDF } from "../Hooks/useLoadPDF";
import { useRearrangePages } from "../Hooks/useRearrangePages";
import { useRotatePage } from "../Hooks/useRotatePage";

export function RenderPages({ url }: { url: string }) {
    const canvasRefs = useRef<HTMLCanvasElement[]>([]);
    const context = useContext(pdfRefsContext);
    const { loadPDF, pageNum } = useLoadPDF();
    const { removePage } = useRemovePage();
    const { rearrangePages } = useRearrangePages();
    const { rotatePage} = useRotatePage();

    useEffect(() => {
        context.setPdfRefs!(canvasRefs.current);
        loadPDF(url, canvasRefs.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return (
        <div id="canvas-container">
            {[...Array(pageNum).keys()].map(i => (
                <div className="flex items-center" key={i}>
                    <canvas ref={ref => {canvasRefs.current[i] = ref!}} id={"canvas" + i} className="border-4 border-gray-500"/>
                    <div className="flex flex-col items-center m-4">
                        <button onClick={() => rotatePage(i)}>Rotate</button>
                        {i > 0 &&
                            <button onClick={() => rearrangePages([i, i - 1])}>Move Up</button>
                        }
                        <div>{i + 1}</div>
                        {i < (pageNum - 1) &&
                            <button onClick={() => rearrangePages([i, i + 1])}>Move Down</button>
                        }
                        {pageNum > 1 &&
                            <button onClick={() => removePage(i)}>Delete Page</button>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
};