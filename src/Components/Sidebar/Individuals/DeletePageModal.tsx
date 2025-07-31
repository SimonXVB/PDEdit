export function DeletePageModal({ removePage, setToggleDelete }: { removePage: () => void, setToggleDelete: () => void }) {
    return (
        <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-gray-500/50 z-30" onClick={setToggleDelete}>
            <div className="bg-rose-500 p-4 pt-2 rounded-xs shadow-lg">
                <p className="text-white font-bold my-2 mb-4">Delete Page?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={removePage} className="*:fill-green-500 cursor-pointer bg-white p-1 rounded-md hover:bg-gray-200" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                        </svg>
                    </button>
                    <button onClick={setToggleDelete} className="*:fill-red-500 cursor-pointer bg-white p-1 rounded-md hover:bg-gray-200" title="Cancel">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
};