import { useAddPages } from "../Hooks/useAddPages";

export function Navbar() {
    const { addPages } = useAddPages();

    function handleAddPage(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            addPages(e.target.files[0]);
        };
    };

    return (
        <nav className="flex justify-between p-4 border-2 border-purple-500">
            <div id="navbarLogo">
                Logo
            </div>
            <div id="navbarControls" className="flex gap-4 ">
                <button>Add Image</button>
                <button>Draw</button>
                <button>Add text</button>
                <button>Delete Page Modal</button>
                <span className="relative w-fit border-2 border-black">
                    <input type="file" onChange={handleAddPage} className="cursor-pointer absolute top-0 left-0 w-full opacity-0"/>
                    <div>Add PDF</div>
                </span>
            </div>
        </nav>
    )
};