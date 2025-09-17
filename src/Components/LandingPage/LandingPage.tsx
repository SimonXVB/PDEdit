import { UploadButton } from "./UploadButton.tsx";
import logo from "../../Assets/Logo.png";

export function LandingPage() {
    return (
        <div className="h-dvh flex flex-col justify-center items-center gap-25">
            <img src={logo} className="px-4" width={500} alt="PD-Edit Logo"/>
            <UploadButton/>
        </div>
    )
};