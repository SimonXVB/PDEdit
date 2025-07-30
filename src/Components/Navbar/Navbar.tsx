import { useContext, useRef } from "react";
import { useAddPages } from "../../Hooks/useAddPages.ts";
import { useZoomPages } from "../../Hooks/useZoomPages.ts";
import { NavbarButton } from "./Individuals/NavbarButton.tsx";
import { zoomContext } from "../Context/ZoomContext/zoomContext.ts";
import { useDownloadPDF } from "../../Hooks/useDownloadPDF.ts";

export function Navbar() {
    const { addPages } = useAddPages();
    const { zoomPages } = useZoomPages();
    const { downloadPDF } = useDownloadPDF();
    
    const zoomCTX = useContext(zoomContext);
    const inputButtonRef = useRef<HTMLInputElement>(null);

    function handleAddPage(e: React.ChangeEvent<HTMLInputElement>) {
        addPages(e.target.files![0]);
    };

    return (
        <div className="flex justify-center sticky top-0">
            <nav className="flex justify-center gap-2 p-3 my-4 rounded-xl bg-white border-4 border-cyan-500">
                <NavbarButton title="Download PDF" onClick={downloadPDF}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                    </svg>
                </NavbarButton>
                <div className="flex items-center">
                    <NavbarButton title={"Zoom In"} onClick={() => zoomPages("plus")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                            <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
                            <path fillRule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </NavbarButton>
                    <p className="font-bold rounded-xl text-cyan-500 mx-2 text-lg" title="Zoom Level">{Math.floor(zoomCTX.zoomLevel * 100)}%</p>
                    <NavbarButton title={"Zoom Out"} onClick={() => zoomPages("minus")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                            <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
                            <path fillRule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </NavbarButton>
                </div>
                <>
                    <NavbarButton title={"Add PDF"} onClick={() => inputButtonRef.current!.click()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </NavbarButton>
                    <input ref={inputButtonRef} type="file" onChange={handleAddPage} title="Add PDF" className="hidden"/>
                </>
            </nav>
        </div>
    )
};