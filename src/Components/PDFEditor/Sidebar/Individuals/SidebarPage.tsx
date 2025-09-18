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

    const isDragging = useRef<boolean>(false);
    const offsetX = useRef<number>(0);
    const offsetY = useRef<number>(0);
    
    const is90Degs = page.rotation === 90 || page.rotation === 270;

    const RATIO = is90Degs ? page.width / page.height : page.height / page.width;
    const WIDTH = 120;
    const HEIGHT = 120 * RATIO;
    
    const { rearrangePages } = useRearrangePages();

    function pointerDown(e: React.PointerEvent<HTMLCanvasElement>, index: number) {
        document.body.classList.add("no-overflow");
        document.documentElement.classList.add("no-overflow");
        e.currentTarget.classList.add("dragging");


        offsetX.current = e.clientX;
        offsetY.current = e.clientY;

        setDraggingId(index);
        isDragging.current = true;
    };

    function pointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
        if(!isDragging.current) return;

        e.currentTarget.style.left = (e.clientX - offsetX.current) + "px";
        e.currentTarget.style.top = (e.clientY - offsetY.current) + "px";
    };

    function pointerStop(e: React.PointerEvent<HTMLCanvasElement>) {
        if(!isDragging.current) return;

        document.body.classList.remove("no-overflow");
        document.documentElement.classList.remove("no-overflow");
        e.currentTarget.classList.remove("dragging");

        e.currentTarget.style.left = "0px";
        e.currentTarget.style.top = "0px";

        const targetId = document.elementFromPoint(e.clientX, e.clientY)?.getAttribute("data-index");
        
        if(targetId !== null && Number(targetId) !== draggingId) {
            rearrangePages(draggingId!, Number(targetId));
        };

        setDraggingId(null);
        isDragging.current = false;
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
            <div className="relative" style={{width: WIDTH + "px", height: HEIGHT + "px"}}>
                <div className="absolute top-0 left-0 w-full h-full bg-transparent">
                    <div className="h-full rounded-lg border-2 border-dashed border-rose-500"></div>
                </div>
                <canvas ref={canvasRef} className="relative border-[1px] cursor-grab rounded-lg dnd-target z-10"
                    onPointerDown={e => pointerDown(e, index)}
                    onPointerMove={pointerMove}
                    onPointerUp={pointerStop}
                    onPointerOut={pointerStop}
                    data-index={index}
                ></canvas>
            </div>
            <p className="text-center px-1 text-black">{index + 1}</p>
        </div>
    )
};