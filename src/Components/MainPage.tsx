import { useSetURL } from "../Hooks/useSetURL";
import { useAddPages } from "../Hooks/useAddPages";
import { RenderPages } from "./RenderPages";
import { PDFContext } from "../Context/PDFContext/PDFContext";
import { useContext } from "react";

export function MainPage() {
    const context = useContext(PDFContext);

    const { setURL } = useSetURL();
    const { addPages } = useAddPages();

    function handleFile(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            setURL(e.target.files[0]);
        };
    };

    function handleAddPage(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            addPages(e.target.files[0]);
        };
    };

    return (
        <div className="flex flex-col items-center m-4">
            <input type="file" onChange={handleFile}/>
            <RenderPages url={context.url!}/>
            {context.url &&
                <>
                    <input type="file" onChange={handleAddPage}/>
                </>
            }
        </div>
    )
};