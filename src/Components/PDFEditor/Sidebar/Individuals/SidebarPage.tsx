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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const is90Degs = page.rotation === 90 || page.rotation === 270;
    
    const RATIO = is90Degs ? page.width / page.height : page.height / page.width;
    const WIDTH = 120;
    const HEIGHT = 120 * RATIO;
    
    const { rearrangePages } = useRearrangePages();
    
    function handleDragOver(e: React.DragEvent<HTMLCanvasElement>) {
        e.preventDefault();

        e.currentTarget.style.borderColor = "#fb2c36";
        e.currentTarget.style.outline = "1px solid #fb2c36";
    };

    function handleDragLeave(e: React.DragEvent<HTMLCanvasElement>) {
        e.preventDefault();

        e.currentTarget.style.borderColor = "#000000";
        e.currentTarget.style.outline = "";
    };

    function handleDrop(e: React.DragEvent<HTMLCanvasElement>, id: number) {
        e.preventDefault();

        rearrangePages(draggingId!, id);
        setDraggingId(null);

        e.currentTarget.style.outline = "";
        e.currentTarget.style.borderColor = "#000000";
    };

    useEffect(() => {
        const img = new Image();
        img.src = page.pdfImg;

        img.onload = () => {
            const ctx = canvasRef.current!.getContext("2d");

            canvasRef.current!.width = WIDTH;
            canvasRef.current!.height = HEIGHT;

            ctx!.translate(WIDTH / 2, HEIGHT / 2);
            ctx!.rotate(page.rotation * (Math.PI / 180));

            if(is90Degs) {
                ctx!.drawImage(img, -(HEIGHT / 2), -(WIDTH / 2), HEIGHT, WIDTH);
            } else {
                ctx!.drawImage(img, -(WIDTH / 2), -(HEIGHT / 2), WIDTH, HEIGHT);
            };
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.pdfImg, page.rotation]);

    return (
        <div className="flex flex-col justify-center" style={{minHeight: (140 * (page.height / page.width)) + "px"}}>
            <div className="relative">
                {draggingId === index && 
                    <div className="absolute top-0 left-0 w-full h-full bg-white z-10">
                        <div className="h-full rounded-lg border-2 border-dashed border-rose-500"></div>
                    </div>
                }
                <canvas ref={canvasRef} className="border-[1px] cursor-grab rounded-lg"
                    onDragStart={() => setDraggingId(index)}
                    onDragOver={e => handleDragOver(e)}
                    onDrop={e => handleDrop(e, index)}
                    onDragLeave={e => handleDragLeave(e)}
                    onDragEnd={() => setDraggingId(null)}
                    draggable
                ></canvas>
            </div>
            <p className="text-center px-1 text-black">{index + 1}</p>
        </div>
    )
};