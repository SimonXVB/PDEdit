import { useContext, useEffect, useRef } from "react"
import { pdfContext } from "../../Context/PDFCTX/pdfContext.ts";
import { mainContext } from "../../Context/MainCTX/mainContext.ts";

export function RenderPages() {
    const { pdfPages } = useContext(pdfContext);
    const { zoomLevel } = useContext(mainContext)
    const canvasRefs = useRef<HTMLCanvasElement[]>([]);

    useEffect(() => {
        pdfPages.forEach((page, i) => {
            const img = new Image();
            img.src = page.pdfImg;

            const is90Degs = (page.rotation === 90 || page.rotation === 270);

            const RATIO = is90Degs ? page.width / page.height : page.height / page.width;
            const WIDTH = window.innerWidth * 0.6;
            const HEIGHT = (window.innerWidth * RATIO) * 0.6;

            img.onload = () => {
                const ctx = canvasRefs.current[i].getContext("2d");

                canvasRefs.current[i].width = WIDTH * zoomLevel;
                canvasRefs.current[i].height = HEIGHT * zoomLevel;

                ctx!.scale(zoomLevel, zoomLevel);
                ctx!.translate(WIDTH / 2, HEIGHT / 2);
                ctx!.rotate(page.rotation * (Math.PI / 180));

                if(is90Degs) {
                    ctx!.drawImage(img, -(HEIGHT / 2), -(WIDTH / 2), HEIGHT, WIDTH);
                } else {
                    ctx!.drawImage(img, -(WIDTH / 2), -(HEIGHT / 2), WIDTH, HEIGHT);
                };
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