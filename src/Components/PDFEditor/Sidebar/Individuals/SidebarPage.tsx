import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { PDFPagesInterface } from "../../../../Context/PDFCTX/pdfContext.ts";
import { useRearrangePages } from "../../../../Hooks/useRearrangePages.ts";

interface SideBarInterface {
    page: PDFPagesInterface, 
    index: number, 
    draggingId: number | null, 
    setDraggingId: Dispatch<SetStateAction<number | null>>
};

export function SidebarPage({ page, index, draggingId, setDraggingId }: SideBarInterface) {
    const pageRef = useRef<HTMLImageElement>(null);
    
    const is90Degs = page.rotation === 90 || page.rotation === 270;
    
    const ratio = is90Degs ? page.width / page.height : page.height / page.width;
    const width = 120;
    const height = 120 * ratio;
    
    const { rearrangePages } = useRearrangePages();

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
        })();
    }, [page.pdfPage, page.rotation]);

    return (
        <div className="flex flex-col justify-center" style={{minHeight: (140 * (page.height / page.width)) + "px"}}>
            <img ref={pageRef} className={`relative border-[1px] cursor-grab rounded-lg`} height={height} width={width}
                onDragStart={() => setDraggingId(index)}
                onDragOver={e => handleDragOver(e)}
                onDrop={e => handleDrop(e, index)}
                onDragLeave={e => handleDragLeave(e)}
                onDragEnd={() => setDraggingId(null)}
                draggable
            ></img>
            <p className="text-center px-1 text-black">{index + 1}</p>
        </div>
    )
};