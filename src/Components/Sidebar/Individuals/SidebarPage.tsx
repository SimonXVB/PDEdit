import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { PDFPagesInterface } from "../../../Context/PDFCTX/pdfContext.ts";
import { useRearrangePages } from "../../../Hooks/useRearrangePages.ts";
import { mainContext } from "../../../Context/MainCTX/mainContext.ts";

interface SideBarInterface {
    el: PDFPagesInterface, 
    i: number, 
    draggingId: number | null, 
    setDraggingId: Dispatch<SetStateAction<number | null>>
};

export function SidebarPage({ el, i, draggingId, setDraggingId }: SideBarInterface) {
    const { zoomLevel } = useContext(mainContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const { rearrangePages } = useRearrangePages();
    
    function handleDragOver(e: React.DragEvent<HTMLCanvasElement>) {
        e.preventDefault();

        e.currentTarget.style.borderColor = "#00b8db";
        e.currentTarget.style.outline = "3px solid #00b8db";
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
        const rotation = el.rotation;
        const ctx = canvasRef.current!.getContext("2d");
        const img = new Image();

        img.onload = () => {
            if(rotation === 90 || rotation === 270) {
                canvasRef.current!.height = (el.width * 0.1);
                canvasRef.current!.width = (el.height * 0.1);
    
                ctx!.save()
                ctx!.scale(0.1, 0.1);
                ctx!.translate(el.height / 2, el.width / 2);
            } else {
                canvasRef.current!.height = (el.height * 0.1);
                canvasRef.current!.width = (el.width * 0.1);
    
                ctx!.save();
                ctx!.scale(0.1, 0.1);
                ctx!.translate(el.width / 2, el.height / 2);
            };
    
            ctx!.rotate(el.rotation * (Math.PI / 180));
            ctx!.drawImage(img, -(el.width / 2), -(el.height / 2), el.width, el.height);
            ctx!.restore();
        };

        img.src = el.pdfImg;
    }, [el.pdfImg, el.height, el.rotation, el.width, zoomLevel]);


    return (
        <div className="relative">
            {draggingId === i && 
                <div className="absolute top-0 left-0 w-full h-full bg-white z-10">
                    <div className="h-full rounded-xl border-2 border-dashed border-cyan-500"></div>
                </div>
            }
            <canvas ref={canvasRef} className="border-[1px] cursor-grab w-[120px]"
                onDragStart={() => setDraggingId(i)}
                onDragOver={e => handleDragOver(e)}
                onDrop={e => handleDrop(e, i)}
                onDragLeave={e => handleDragLeave(e)}
                onDragEnd={() => setDraggingId(null)}
                draggable
            ></canvas>
        </div>
    )
};