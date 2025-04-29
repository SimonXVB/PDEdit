import { useRef } from "react";

export function UploadButton({ handleFile }: { handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const inputButtonRef = useRef<HTMLInputElement>(null);

    return (
        <button onClick={() => inputButtonRef.current!.click()} className="flex flex-col items-center relative p-8 bg-cyan-500 text-white rounded-xl font-semibold cursor-pointer hover:bg-cyan-500/80 hover:-translate-y-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#FFFFFF" viewBox="0 0 16 16"><path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"/></svg>
            <div><strong>Choose a PDF</strong> or drag it here.</div>
            <input type="file" accept="application/pdf" onChange={handleFile} ref={inputButtonRef} className="absolute w-full top-0 h-full opacity-0 cursor-pointer select-none"/>
        </button>
    )
};