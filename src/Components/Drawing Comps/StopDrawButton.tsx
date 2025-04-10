import { useContext } from "react";
import { drawingContext } from "../../Context/DrawingContext/drawingContext";

export function StopDrawButton() {
    const drawingCTX = useContext(drawingContext);

    function stopDraw() {
        drawingCTX.setDrawingOptions(prev => (
            {
                ...prev,
                color: "",
                drawingEnabled: false
            }
        ));
    };

    return (
        <button onClick={stopDraw} title="Stop Drawing" className={`my-1 rounded-xl w-[35px] aspect-square cursor-pointer outline-2 outline-black`}></button>
    )
};