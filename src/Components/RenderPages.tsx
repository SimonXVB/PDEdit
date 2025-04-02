import { useContext, useEffect } from "react"
import { useLoadPDF } from "../Hooks/useLoadPDF";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { PDFPageControls } from "./Individuals/PDFPageControls";
import { zoomContext } from "../Context/ZoomContext/zoomContext";
import { Canvas } from "./Individuals/Canvas";

export function RenderPages({ url }: { url: string }) {
    const { loadPDF } = useLoadPDF();
    const pdfCTX = useContext(pdfContext);
    const zoomCTX = useContext(zoomContext);
 
    useEffect(() => {
        loadPDF(url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    
    return (
        <div id="canvas-container">
            {pdfCTX.pdfPages!.map((el, i) => (
                <div className="flex items-center" key={i}>
                    <div className="relative border-2 border-red-400">
                        <img src={el.pdfImg} style={{
                            width: el.originalSize!.width * zoomCTX.zoomLevel!, 
                            height: el.originalSize!.height * zoomCTX.zoomLevel!
                        }} className="pdfImageEl"/>
                        <Canvas canvasElement={el.pdfCanvas!} ogSize={el.originalSize!} zoomLevel={zoomCTX.zoomLevel!}/>
                    </div>
                    <PDFPageControls pageNum={pdfCTX.pdfPages!.length} index={i}/>
                </div>
            ))}
        </div>
    )
};