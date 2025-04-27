import { useContext, useEffect, useRef } from "react";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { useLoadInitialPDF } from "../Hooks/useLoadInitialPDF";
import { useZoomPages } from "../Hooks/useZoomPages";
import { UploadButton } from "./Individuals/UploadButton";
import { RenderPages } from "./RenderPages";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function MainPage() {
    const pdfCTX = useContext(pdfContext);
    const divRef = useRef<HTMLDivElement>(null);

    const { loadInitialPDF } = useLoadInitialPDF();
    const { ctrlWheelZoom } = useZoomPages();

    function handleFile(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            loadInitialPDF(e.target.files[0]);
        };
    };

    useEffect(() => {
        if(divRef.current) {
            const ref = divRef.current;

            ref.addEventListener("wheel", ctrlWheelZoom);
            return () => ref.removeEventListener("wheel", ctrlWheelZoom);
        };
    });

    return (
        <>
            {!pdfCTX.pdfDoc && 
                <div className="h-screen flex justify-center items-center">
                    <UploadButton handleFile={handleFile}/>
                </div>
            }
            {pdfCTX.pdfDoc &&
                <div ref={divRef} className="min-h-screen h-full">
                    <Navbar/>
                    <div className="flex w-full">
                        <RenderPages/>
                        <Sidebar/>
                    </div>
                </div>
            }
        </>
    )
};