export function LoadingSpinner() {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-400/40 flex justify-center items-center z-20">
            <svg id="loading-spinner" xmlns="http://www.w3.org/2000/svg" height="75px" viewBox="0 -960 960 960" width="75px" fill="#ad46ff"><path d="M480-46q-90 0-168.97-34.08-78.97-34.07-137.92-93.03-58.96-58.95-93.03-137.92Q46-390 46-480q0-90.14 34.06-168.88 34.07-78.74 93-137.93Q232-846 311-880t169-34q26 0 44.5 18.5T543-851q0 26-18.5 44.5T480-788q-128.01 0-218.01 89.99-89.99 89.99-89.99 218T261.99-262q89.99 90 218 90T698-261.99q90-90 90-218.01 0-26 18.5-44.5T851-543q26 0 44.5 18.5T914-480q0 90-34.06 169.01-34.07 79.01-93 138Q728-114 649.14-80 570.28-46 480-46Z"/></svg>
        </div>
    )
};