import { RenderPages } from "./RenderPages";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { useContext, useEffect, useRef } from "react";
import { useLoadInitialPDF } from "../Hooks/useLoadInitialPDF";
import { UploadButton } from "./Individuals/UploadButton";
import { Sidebar } from "./Sidebar";
import { useZoomPages } from "../Hooks/useZoomPages";

export function MainPage() {
    const pdfCTX = useContext(pdfContext);

    const { loadInitialPDF } = useLoadInitialPDF();
    const { ctrlWheelZoom } = useZoomPages();

    const divRef = useRef<HTMLDivElement>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            loadInitialPDF(e.target.files[0]);
        };
    };

    useEffect(() => {
        if(divRef.current) {
            const ref = divRef.current!;

            ref.addEventListener("wheel", ctrlWheelZoom);
            return () => ref.removeEventListener("wheel", ctrlWheelZoom);
        }
    });

    return (
        <>
            {!pdfCTX.pdfDoc && 
                <div className="h-screen flex justify-center items-center">
                    <UploadButton handleFile={handleFile}/>
                </div>
            }
            {pdfCTX.pdfPages.length > 0 &&
                <div ref={divRef} className="flex justify-center items-start grow">
                    <RenderPages/>
                    <Sidebar/>
                </div>
            }
        </>
    )
};