export function NavbarButton({ children, title, onClick }: { children: React.ReactNode, title: string, onClick: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button onClick={onClick} title={title} className="button">
            <span className="bg"></span>
            <span className="front font-semibold">{children}</span>
        </button>
    )
};