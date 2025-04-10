import { useRef } from "react";

export function UploadButton({ handleFile }: { handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    const inputButtonRef = useRef<HTMLInputElement>(null);

    function clickInput() {
        inputButtonRef.current!.click();
    };

    return (
        <button className="button" onClick={clickInput}>
            <span className="bg"></span>
            <span className="front">
                <div className="flex flex-col justify-center items-center p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#FFF" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
                        <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    <div><strong>Choose a PDF</strong> or drag it here.</div>
                    <input type="file" id="file" onChange={handleFile} ref={inputButtonRef} className="absolute w-full h-full opacity-0 top-0 left-0 cursor-pointer"/>
                </div>
            </span>
        </button>
    )
};