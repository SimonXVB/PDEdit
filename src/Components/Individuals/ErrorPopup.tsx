import { useContext, useEffect, useRef } from "react"
import { errorContext } from "../../Context/ErrorContext/errorContext"

export function ErrorPopup() {
    const errorCTX = useContext(errorContext);
    
    const timeoutRef = useRef<number>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    const errors = {
        "fileTypeError": "Invalid File Type",
        "addPageError": "Failed to add page.",
        "setURLError": "Internal Error",
        "rearrangePageError": "Failed to rearrange pages.",
        "removePageError": "Failed to remove page.",
        "rotatePageError": "Failed to rotate page.",
        "downloadPDFError": "Failed to download PDF."
    };

    useEffect(() => {
        clearTimeout(timeoutRef.current!);

        if(errorRef.current) {
            errorRef.current.style.animation = "slide-in .75s ease forwards";

            timeoutRef.current = setTimeout(() => {
                errorRef.current!.style.animation = "slide-out .75s ease forwards";

                errorRef.current!.onanimationend = () => {
                    errorCTX.setError("");
                };
            }, 4000);
        };
    }, [errorCTX]);

    return (
        <>
            {errorCTX.error && 
                <div ref={errorRef} className="fixed top-0 -left-full bg-cyan-700 text-white p-5 m-5 rounded-md font-bold z-30">
                    Error: {errors[errorCTX.error as keyof typeof errors]}
                </div>
            }
        </>
    )
};