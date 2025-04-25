interface ButtonInterface {
    children: React.ReactNode, 
    title: string, 
    onClick: React.MouseEventHandler<HTMLButtonElement>
};

export function NavbarButton({ children, title, onClick }: ButtonInterface) {
    return (
        <button onClick={onClick} title={title} className="button">
            <span className="bg"></span>
            <span className="front">{children}</span>
        </button>
    )
};