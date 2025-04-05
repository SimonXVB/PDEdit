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

    const divRef = useRef<HTMLDivElement>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            loadInitialPDF(e.target.files[0]);
        };
    };

    const { ctrlSZoom } = useZoomPages();

    useEffect(() => {
        const ref = divRef.current!;

        ref.addEventListener("wheel", ctrlSZoom);
        return () => ref.removeEventListener("wheel", ctrlSZoom);
    });

    return (
        <div ref={divRef} className="grow-[1] flex justify-center items-center">
            <div className="flex flex-col items-center justify-center grow-1">
                {!pdfCTX.pdfDoc && <UploadButton handleFile={handleFile}/>}
                {pdfCTX.pdfPages!.length > 0 && 
                    <div className="flex">
                        <RenderPages/>
                        <Sidebar />
                    </div>
                }
            </div>
        </div>
    )
};