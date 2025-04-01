import { useEffect, useRef } from "react";

export function Canvas({ canvasElement }: { canvasElement: HTMLCanvasElement }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current!.innerHTML = "";
        ref.current!.appendChild(canvasElement);
    }, [canvasElement]);

    return <div ref={ref} className="absolute top-0 left-0 z-10"></div>
};