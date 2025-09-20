import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { pdfContext, PDFPagesInterface } from "../../../../Context/PDFCTX/pdfContext.ts";
import { useRearrangePages } from "../../../../Hooks/useRearrangePages.ts";
import { useRotatePage } from "../../../../Hooks/useRotatePage.ts";
import { PDFPageControls } from "./PDFPageControls.tsx";

interface SideBarInterface {
    page: PDFPagesInterface, 
    i: number, 
    draggingId: number | null, 
    setDraggingId: Dispatch<SetStateAction<number | null>>,
    setDeleteIndex: Dispatch<SetStateAction<number | null>>
};

export function SidebarPage({ page, i, draggingId, setDraggingId, setDeleteIndex }: SideBarInterface) {
    const { pdfDoc } = useContext(pdfContext);

    const [loading, setLoading] = useState<boolean>(true);

    const { rearrangePages } = useRearrangePages();
    const { rotatePage } = useRotatePage();

    const pageRef = useRef<HTMLImageElement>(null);
    
    const is90Degs = page.rotation === 90 || page.rotation === 270;
    const ratio = is90Degs ? page.width / page.height : page.height / page.width;

    const width = 120;
    const height = 120 * ratio;

    function handleDragOver(e: React.DragEvent<HTMLImageElement>) {
        e.preventDefault();
        e.currentTarget.classList.add("drag-over");
    };

    function handleDragLeave(e: React.DragEvent<HTMLImageElement>) {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over");
    };

    function handleDrop(e: React.DragEvent<HTMLImageElement>, id: number) {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over");

        rearrangePages(draggingId!, id);
        setDraggingId(null);
    };

    useEffect(() => {
        (async function() {
            const canvas: HTMLCanvasElement = document.createElement("canvas");
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

            const viewport = page.pdfPage.getViewport({scale: 1, rotation: page.rotation});
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderParams = {
                canvasContext: ctx,
                canvas: canvas,
                viewport: viewport
            };
            
            await page.pdfPage.render(renderParams).promise;
            pageRef.current!.src = canvas.toDataURL('image/png');

            setLoading(false);
        })();
    }, [page.pdfPage, page.rotation]);

    return (
        <div className="relative flex items-center mt-1 mb-2" style={{minHeight: (140 * (page.height / page.width)) + "px"}}>
            {loading && <div className="absolute top-1/2 left-1/2 -translate-1/2 w-14 h-14 border-r-transparent border-3 border-rose-500 rounded-full animate-[spin_700ms_ease-in-out_infinite]"></div>}
            <div className={`flex transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
                <PDFPageControls pageCount={pdfDoc!.getPageCount()} index={i} setDeleteIndex={() => setDeleteIndex(i)} rotatePage={rotatePage} rearrangePages={rearrangePages}/>
                <div>
                    <img ref={pageRef} className="relative border-[1px] cursor-grab" height={height} width={width}
                        onDragStart={() => setDraggingId(i)}
                        onDragOver={e => handleDragOver(e)}
                        onDrop={e => handleDrop(e, i)}
                        onDragLeave={e => handleDragLeave(e)}
                        onDragEnd={() => setDraggingId(null)}
                        draggable
                    ></img>
                    <p className="text-center px-1 text-black">{i + 1}</p>
                </div>
            </div>
        </div>
    )
};