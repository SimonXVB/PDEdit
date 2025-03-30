import { useEffect } from "react"
import { useLoadPDF } from "../Hooks/useLoadPDF";
import { PDFPageControls } from "./Individuals/PDFPageControls";

export function RenderPages({ url }: { url: string }) {
    const { loadPDF, pdfImgs } = useLoadPDF();
 
    useEffect(() => {
        loadPDF(url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return (
        <div id="canvas-container">
            {pdfImgs.map((el, i) => (
                <div className="flex items-center" key={i}>
                    <img className="border-2 border-purple-500" src={el} />
                    <PDFPageControls pageNum={pdfImgs.length} index={i}/>
                </div>
            ))}
        </div>
    )
};