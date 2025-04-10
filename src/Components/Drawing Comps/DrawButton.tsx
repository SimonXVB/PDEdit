import { useContext } from "react";
import { drawingContext } from "../../Context/DrawingContext/drawingContext";

export function DrawButton({ color, title }: { color: string, title: string }) {
    const drawingCTX = useContext(drawingContext);
    const currentColor = drawingCTX.drawingOptions.color;

    function setColor(color: string) {
        drawingCTX.setDrawingOptions(prev => (
            {
                ...prev,
                drawingEnabled: true,
                color: color
            } 
        ));
    };

    return (
        <button onClick={() => setColor(color)} title={title} className={`my-1 rounded-xl w-[35px] aspect-square cursor-pointer`} 
        style={{background: color, outline: currentColor === color ? "4px solid #A294F9" : "2px solid #000000"}}></button>
    )
};