import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { pdfContext } from "../../../../Context/PDFCTX/pdfContext.ts";
import { useRearrangePages } from "../../../../Hooks/useRearrangePages.ts";
import { useRotatePage } from "../../../../Hooks/useRotatePage.ts";
import { PDFPageControls } from "./PDFPageControls.tsx";
import { PDFPageProxy } from "pdfjs-dist";

interface SideBarInterface {
    page: PDFPageProxy, 
    i: number, 
    draggingId: number | null, 
    setDraggingId: Dispatch<SetStateAction<number | null>>,
    setDeleteIndex: Dispatch<SetStateAction<number | null>>
};

export function SidebarPage({ page, i, draggingId, setDraggingId, setDeleteIndex }: SideBarInterface) {
    const { pdfDoc } = useContext(pdfContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [src, setSrc] = useState<string | undefined>(undefined);

    const { rearrangePages } = useRearrangePages();
    const { rotatePage } = useRotatePage();

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
            const viewport = page.getViewport({scale: 1});

            const canvas: HTMLCanvasElement = document.createElement("canvas");
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderParams = {
                canvasContext: ctx,
                canvas: canvas,
                viewport: viewport
            };
            
            await page.render(renderParams).promise;

            setSrc(canvas.toDataURL('image/png'));
            setLoading(false);
        })();
    }, [page]);

    return (
        <div className="relative flex items-center mt-1 mb-2 min-h-[200px]">
            {loading && <div className="absolute top-1/2 left-1/2 -translate-1/2 w-14 h-14 border-r-transparent border-3 border-rose-500 rounded-full animate-[spin_700ms_ease-in-out_infinite]"></div>}
            <div className={`flex transition-all duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
                <PDFPageControls pageCount={pdfDoc!.getPageCount()} index={i} setDeleteIndex={setDeleteIndex} rotatePage={rotatePage} rearrangePages={rearrangePages}/>
                <div>
                    <img className="relative border-[1px] cursor-grab" width={120} src={src}
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