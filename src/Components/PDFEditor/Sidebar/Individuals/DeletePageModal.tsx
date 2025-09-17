import { useEffect } from "react"

export function DeletePageModal({ removePage, setDeleteIndex }: { removePage: () => void, setDeleteIndex: () => void }) {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {document.body.style.overflow = "scroll"};
    }, []);

    return (
        <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-gray-500/50 z-30">
            <div className="bg-white p-4 pt-2 rounded-xs shadow-lg">
                <p className="text-rose-500 font-bold mt-2 mb-6 text-2xl">Delete Page?</p>
                <div className="flex justify-center gap-2.5">
                    <button onClick={removePage} className="flex justify-center w-full cursor-pointer rounded-xs bg-rose-500 text-white font-semibold p-1 transition-all duration-100 hover:-translate-y-0.5 hover:bg-rose-400">
                        Delete
                    </button>
                    <button onClick={setDeleteIndex} className="flex justify-center w-full cursor-pointer rounded-xs bg-white font-semibold p-1 transition-all duration-100 hover:-translate-y-0.5 hover:bg-gray-200">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
};