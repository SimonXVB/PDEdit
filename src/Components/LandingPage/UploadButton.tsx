import { useSetPDF } from "../../Hooks/setPDF";

export function UploadButton() {
    const { setPDF } = useSetPDF();

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        setPDF(e.target.files![0]);
    };

    return (
        <button className="flex relative justify-between items-center px-4 py-[5px] rounded-xs w-[200px] bg-rose-500 text-white font-semibold cursor-pointer transition-all duration-50 hover:bg-rose-400 hover:scale-103">
            <div>Upload PDF</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#FFFFFF" viewBox="0 0 16 16">
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"/>
            </svg>
            <label htmlFor="file" className="w-full h-full absolute cursor-pointer"></label>
            <input type="file" id="file" onChange={handleFile} className="hidden"/>
        </button>
    )
};