interface ButtonInterface {
    children: React.ReactNode, 
    title: string, 
    onClick?: React.MouseEventHandler<HTMLButtonElement>
};

export function NavbarButton({ children, title, onClick }: ButtonInterface) {
    return (
        <button onClick={onClick} title={title} className="relative bg-rose-500 text-white px-3 py-2 rounded-xs cursor-pointer transition-all duration-100 hover:bg-rose-500/80 hover:-translate-y-0.5">
            {children}
        </button>
    )
};