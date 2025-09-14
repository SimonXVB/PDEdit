import { useContext, useEffect, useRef } from "react"
import { mainContext } from "../Context/MainCTX/mainContext";

export function ErrorPopup() {
    const { error, setError } = useContext(mainContext);
    
    const timeoutRef = useRef<number>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    const errors = {
        "fileTypeError": "Invalid file type",
        "setPDFError": "Failed to load PDF",
        "rearrangePageError": "Failed to rearrange pages.",
        "removePageError": "Failed to remove page",
        "rotatePageError": "Failed to rotate page",
        "downloadPDFError": "Failed to download PDF",
    };

    useEffect(() => {
        clearTimeout(timeoutRef.current!);

        if(errorRef.current) {
            errorRef.current.style.animation = "slide-in .75s ease forwards";

            timeoutRef.current = setTimeout(() => {
                errorRef.current!.style.animation = "slide-out .75s ease forwards";
                errorRef.current!.onanimationend = () => setError("");
            }, 4000);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <>
            {error && 
                <div ref={errorRef} className="fixed top-0 -left-full flex items-center text-red-500 text-lg p-2 pr-3 px-1 m-5 font-semibold rounded-xs z-10 outline-1 outline-rose-500">
                    <svg className="fill-rose-500" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" viewBox="0 0 16 16">
                        <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                    </svg>
                    {errors[error as keyof typeof errors]}
                </div>
            }
        </>
    )
};