import { useGetURL } from "../Hooks/useGetURL";
import { RenderPages } from "./RenderPages";

export function MainPage() {
    const { getURL, url } = useGetURL();

    function handleFile(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            getURL(e.target.files[0]);
        };
    };

    return (
        <div className="flex flex-col items-center m-4">
            <input type="file" onChange={handleFile}/>
            <RenderPages url={url}/>
        </div>
    )
};