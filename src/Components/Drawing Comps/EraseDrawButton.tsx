import { useContext } from "react";
import { drawingContext } from "../../Context/DrawingContext/drawingContext";

export function EraseDrawButton() {
    const drawingCTX = useContext(drawingContext);
    const currentColor = drawingCTX.drawingOptions.color;

    function setErase() {
        drawingCTX.setDrawingOptions(prev => (
            {
                ...prev,
                drawingEnabled: true,
                color: "erase"
            } 
        ));
    };

    return (
        <button onClick={setErase} title="Erase Tool" className={`my-1 rounded-xl w-[35px] aspect-square cursor-pointer`}
        style={{outline: currentColor === "erase" ? "4px solid #A294F9" : "2px solid #000000"}}></button>
    )
};