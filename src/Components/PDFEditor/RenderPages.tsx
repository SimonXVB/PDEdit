import { useContext, useEffect, useRef } from "react"
import { pdfContext, PDFPagesInterface } from "../../Context/PDFCTX/pdfContext.ts";
import { mainContext } from "../../Context/MainCTX/mainContext.ts";

export function RenderPages() {
    const { pdfPages } = useContext(pdfContext);
    const { zoomLevel } = useContext(mainContext);
    const canvasRefs = useRef<HTMLCanvasElement[]>([]);

    function getDimensions(page: PDFPagesInterface) {
        if(page.width > window.innerWidth) {
            if(page.width > page.height) {
                const width = (page.width - 50) * (window.innerWidth / page.height);
                const height = (page.height - 50) * (window.innerWidth / page.height);

                return [ width, height ];
            } else {
                const width = (page.width - 50) * (window.innerWidth / page.width);
                const height = (page.height - 50) * (window.innerWidth / page.width);

                return [ width, height ];
            };
        } else {
            return [ page.width, page.height ];
        };
    };


    useEffect(() => {
        pdfPages.forEach((page, i) => {
            const rotation = page.rotation;
            const ctx = canvasRefs.current[i].getContext("2d");

            const img = new Image();

            img.onload = () => {
                const [ width, height ] = getDimensions(page);

                if(rotation === 90 || rotation === 270) {
                    canvasRefs.current[i].height = (width * zoomLevel);
                    canvasRefs.current[i].width = (height * zoomLevel);

                    ctx!.save()
                    ctx!.scale(zoomLevel, zoomLevel);
                    ctx!.translate(height / 2, width / 2);
                } else {
                    canvasRefs.current[i].height = (height * zoomLevel);
                    canvasRefs.current[i].width = (width * zoomLevel);

                    ctx!.save();
                    ctx!.scale(zoomLevel, zoomLevel);
                    ctx!.translate(width / 2, height / 2);
                };

                ctx!.rotate(page.rotation * (Math.PI / 180));
                ctx!.drawImage(img, -(width / 2), -(height / 2), width, height);
                ctx!.restore();
            };

            img.src = page.pdfImg;
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