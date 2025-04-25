import { useContext } from "react"
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { zoomContext } from "../Context/ZoomContext/zoomContext";

export function RenderPages() {
    const pdfCTX = useContext(pdfContext);
    const zoomCTX = useContext(zoomContext);
    
    return (
        <div className="flex flex-col w-full overflow-x-auto ml-4">
            {pdfCTX.pdfPages.map((el, i) => (
                <div className="relative mx-auto mb-4 border-2 box-content border-[#A294F9]" id={el.pdfID} style={{width: Math.floor(el.pdfInfo.width * zoomCTX.zoomLevel), rotate: el.pdfInfo?.rotation + "deg"}} key={i}>
                    <img src={el.pdfImg} style={{
                        width: Math.floor(el.pdfInfo.width * zoomCTX.zoomLevel),
                        height: Math.floor(el.pdfInfo.height * zoomCTX.zoomLevel)
                    }}/>
                </div>
            ))}
        </div>
    )
};