import { useContext } from "react"
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { PDFPageControls } from "./Individuals/PDFPageControls";
import { zoomContext } from "../Context/ZoomContext/zoomContext";
import { Canvas } from "./Individuals/Canvas";

export function RenderPages() {
    const pdfCTX = useContext(pdfContext);
    const zoomCTX = useContext(zoomContext);
    
    return (
        <div className="flex items-center justify-center flex-col grow-[1] overflow-x-auto">
            <div>Zoom: {zoomCTX.zoomLevel}</div>
            {pdfCTX.pdfPages!.map((el, i) => (
                <div className="flex flex-col items-center pdfPage" key={i}>
                    <div className="relative border-2 border-red-400">
                        <img src={el.pdfImg} style={{
                            width: Math.floor(el.pdfInfo!.width * zoomCTX.zoomLevel!), 
                            height: Math.floor(el.pdfInfo!.height * zoomCTX.zoomLevel!),
                            rotate: el.pdfInfo?.rotation + "deg"
                        }}/>
                        <Canvas element={el}/>
                    </div>
                    <PDFPageControls pageNum={pdfCTX.pdfPages!.length} index={i}/>
                </div>
            ))}
        </div>
    )
};