import { useContext, useRef } from "react";
import { useAddPages } from "../Hooks/useAddPages";
import { useZoomPages } from "../Hooks/useZoomPages";
import { NavbarButton } from "./Individuals/3DButton";
import { zoomContext } from "../Context/ZoomContext/zoomContext";

export function Navbar() {
    const { addPages } = useAddPages();
    const { zoomPages } = useZoomPages();
    
    const zoomCTX = useContext(zoomContext);
    const inputButtonRef = useRef<HTMLInputElement>(null);

    function handleAddPage(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            addPages(e.target.files[0]);
        };
    };

    return (
        <div className="flex justify-center sticky top-0 z-20 w-screen">
            <nav className="flex gap-4 p-3 my-4 rounded-4xl bg-white border-4 border-[#A294F9]">
                <div className="flex items-center">
                    <NavbarButton title={"Zoom In"} onClick={() => zoomPages("plus")}>Zoom In</NavbarButton>
                    <p className="font-semibold px-3 py-1 rounded-3xl mx-2 bg-[#A194F994]" title="Zoom Level">{Math.floor(zoomCTX.zoomLevel * 100)}%</p>
                    <NavbarButton title={"Zoom Out"} onClick={() => zoomPages("minus")}>Zoom Out</NavbarButton>
                </div>
                <NavbarButton title={"Add PDF"} onClick={() => inputButtonRef.current!.click()}>
                    <input ref={inputButtonRef} type="file" onChange={handleAddPage} title="Add PDF" className="absolute h-full top-0 left-0 w-full opacity-0 cursor-pointer"/>
                    <p>Add PDF</p>
                </NavbarButton>
            </nav>
        </div>
    )
};