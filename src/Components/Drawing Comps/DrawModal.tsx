import { NavbarModal } from "../Individuals/NavbarModal"
import { DrawButton } from "./DrawButton";
import { StopDrawButton } from "./StopDrawButton";
import { drawingContext } from "../../Context/DrawingContext/drawingContext";
import { useContext, useEffect, useRef } from "react";
import { EraseDrawButton } from "./EraseDrawButton";

export function DrawModal() {
    const drawingCTX = useContext(drawingContext);
    const rangeRef = useRef<HTMLInputElement>(null);

    function setLineWidth(e: React.ChangeEvent<HTMLInputElement>) {
        drawingCTX.setDrawingOptions(prev => (
            {
                ...prev,
                lineWidth: Number(e.target.value)
            }
        ));
    };

    useEffect(() => {
        rangeRef.current!.value = String(drawingCTX.drawingOptions.lineWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NavbarModal>
            <div className="flex">
                <div className="mr-4">
                    <DrawButton color={"#ffffff"} title={"White"}/>
                    <DrawButton color={"#000000"} title={"Black"}/>
                    <DrawButton color={"#fb2c36"} title={"Red"}/>
                    <DrawButton color={"#00c950"} title={"Green"}/>
                    <DrawButton color={"#2b7fff"} title={"Blue"}/>
                    <EraseDrawButton/>
                    <StopDrawButton/>
                </div>
                <input ref={rangeRef} onChange={e => setLineWidth(e)} type="range" id="draw-slider" min={1} max={50} className="mr-4 cursor-pointer" title="Line Width"/>
            </div>
        </NavbarModal>
    )
};