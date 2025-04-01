import { useContext, useEffect } from "react"
import { useLoadPDF } from "../Hooks/useLoadPDF";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { PDFPageControls } from "./Individuals/PDFPageControls";
import { Canvas } from "./Individuals/Canvas";

export function RenderPages({ url }: { url: string }) {
    const { loadPDF } = useLoadPDF();
    const context = useContext(pdfContext);
 
    useEffect(() => {
        loadPDF(url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    
    return (
        <div id="canvas-container">
            {context.pdfPages!.map((el, i) => (
                <div className="flex items-center" key={i}>
                    <div className="relative border-2 border-red-400">
                        <img src={el.pdfImg}/>
                        <Canvas canvasElement={el.pdfCanvas!}/>
                    </div>
                    <PDFPageControls pageNum={context.pdfPages!.length} index={i}/>
                </div>
            ))}
        </div>
    )
};