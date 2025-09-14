import { useContext, useEffect, useRef } from "react"
import { pdfContext } from "../../Context/PDFCTX/pdfContext.ts";
import { mainContext } from "../../Context/MainCTX/mainContext.ts";

export function RenderPages() {
    const { pdfPages } = useContext(pdfContext);
    const { zoomLevel } = useContext(mainContext)
    const canvasRefs = useRef<HTMLCanvasElement[]>([]);

    useEffect(() => {
        const height = 1500;
        const width = 1000;

        pdfPages.forEach((page, i) => {
            const img = new Image();
            img.src = page.pdfImg;

            img.onload = () => {
                const ctx = canvasRefs.current[i].getContext("2d");

                canvasRefs.current[i].height = (height * zoomLevel);
                canvasRefs.current[i].width = (width * zoomLevel);

                ctx!.scale(zoomLevel, zoomLevel);
                ctx!.translate(width / 2, height / 2);
                ctx!.rotate(page.rotation * (Math.PI / 180));
                ctx!.drawImage(img, -(width / 2), -(height / 2), width, height);
            };
        });
    }, [pdfPages, zoomLevel]);
    
    return (
        <div className="flex flex-col overflow-x-auto mx-2 w-full">
            {pdfPages.map((page, i) => (
                <div className="mx-auto mb-4" key={page.pdfImg}>
                    <canvas className="border-2 border-gray-700" ref={ref => {canvasRefs.current[i] = ref!}}></canvas>
                    <p className="text-black text-center text-lg h-fit p-2 font-semibold">{i + 1}</p>
                </div>
            ))}
        </div>
    )
};