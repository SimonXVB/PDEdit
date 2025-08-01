import { UploadButton } from "./Individuals/UploadButton.tsx";

export function HomePage() {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-25">
            <img src="src/Assets/Logo.png" className="px-4" width={500} alt="PD-Edit Logo"/>
            <UploadButton/>
        </div>
    )
};