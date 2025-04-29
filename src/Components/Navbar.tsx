import { useContext, useRef } from "react";
import { useAddPages } from "../Hooks/useAddPages.ts";
import { useZoomPages } from "../Hooks/useZoomPages.ts";
import { NavbarButton } from "./Individuals/NavbarButton.tsx";
import { zoomContext } from "../Context/ZoomCTX/zoomContext.ts";
import { useDownloadPDF } from "../Hooks/useDownloadPDF.ts";

export function Navbar() {
    const { addPages } = useAddPages();
    const { zoomPages } = useZoomPages();
    const { downloadPDF } = useDownloadPDF();
    
    const zoomCTX = useContext(zoomContext);
    const inputButtonRef = useRef<HTMLInputElement>(null);

    function handleAddPage(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files) {
            addPages(e.target.files[0]);
        };
    };

    return (
        <div className="flex justify-center sticky top-0 max-w-screen">
            <nav className="flex gap-4 p-3 my-4 rounded-xl bg-white border-4 border-cyan-500 overflow-x-auto" id="navbar">
                <NavbarButton title="Download PDF" onClick={downloadPDF}>Download PDF</NavbarButton>
                <div className="flex items-center">
                    <NavbarButton title={"Zoom In"} onClick={() => zoomPages("plus")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                            <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
                            <path fillRule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </NavbarButton>
                    <p className="font-semibold rounded-xl text-cyan-700 mx-2" title="Zoom Level">{Math.floor(zoomCTX.zoomLevel * 100)}%</p>
                    <NavbarButton title={"Zoom Out"} onClick={() => zoomPages("minus")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                            <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
                            <path fillRule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </NavbarButton>
                </div>
                <NavbarButton title={"Add PDF"} onClick={() => inputButtonRef.current!.click()}>
                    <input ref={inputButtonRef} type="file" accept="application/pdf" onChange={handleAddPage} title="Add PDF" className="absolute h-full top-0 left-0 w-full opacity-0 cursor-pointer"/>
                    <p>Add PDF</p>
                </NavbarButton>
            </nav>
        </div>
    )
};