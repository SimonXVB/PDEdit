export function NavbarModal({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute bg-white border-4 border-[#A294F9] rounded-4xl p-4 translate-y-10">
            {children}
        </div>
    )
};