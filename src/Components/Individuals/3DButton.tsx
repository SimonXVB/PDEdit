import { ReactNode } from "react";

export function NavbarButton({ children, title, onClick }: { children: ReactNode, title: string, onClick: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button onClick={onClick} title={title} className="button">
            <span className="bg"></span>
            <span className="front">{children}</span>
        </button>
    )
};