import { ReactNode } from "react";

export function SidebarButton({ onclick, title, children}: {onclick: () => void, title: string, children: ReactNode}) {
    return (
        <button onClick={onclick} className="rounded-lg p-1 cursor-pointer hover:bg-cyan-500 hover:*:fill-white" title={title}>
            {children}
        </button>
    )
};