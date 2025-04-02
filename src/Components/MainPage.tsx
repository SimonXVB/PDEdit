import { useSetURL } from "../Hooks/useSetURL";
import { RenderPages } from "./RenderPages";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { useContext } from "react";
import { LoadingSpinner } from "./Individuals/LoadingSpinner";
import { UploadButton } from "./Individuals/UploadButton";

export function MainPage() {
    const pdfCTX = useContext(pdfContext);
    const { setURL } = useSetURL();

    function handleFile(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            setURL(e.target.files[0]);
        };
    };

    return (
        <>
            {pdfCTX.pdfLoading &&
                <LoadingSpinner />
            }
            <div className="flex flex-col items-center justify-center grow-1">
                {!pdfCTX.pdfInfo!.pdfURL &&
                    <UploadButton handleFile={handleFile}/>
                }
                <RenderPages url={pdfCTX.pdfInfo!.pdfURL!}/>
            </div>
        </>
    )
};