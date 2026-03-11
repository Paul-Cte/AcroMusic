import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Dashboard({ deconnexion }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const getLinkClass = (path) => {
        const isActive = location.pathname.includes(path);
        return `px-6 py-4 text-sm font-medium transition-colors border-b border-gray-100 block ${isActive ? "bg-gray-100 text-black border-l-4 border-l-black" : "text-gray-600 hover:bg-gray-50 hover:text-black border-l-4 border-l-transparent"}`;
    };

    const closeMenu = () => setIsOpen(false);

    const MenuContent = () => (
        <>
            <div className="flex flex-col pt-4 md:pt-8 flex-1">
                <div className="px-6 mb-8 hidden md:block">
                    <h2 className="text-xl font-bold tracking-tight text-black">AcroMusic</h2>
                    <p className="text-xs text-gray-500 mt-1">Espace Administration</p>
                </div>
                <Link onClick={closeMenu} className={getLinkClass("/new")} to="/admin/dashboard/new">Nouvel album</Link>
                <Link onClick={closeMenu} className={getLinkClass("/discographie")} to="/admin/dashboard/discographie">Discographie</Link>
                <Link onClick={closeMenu} className={getLinkClass("/compositeurs")} to="/admin/dashboard/compositeurs">Compositeurs</Link>
            </div>
            <button onClick={() => { closeMenu(); deconnexion(); }} className="px-6 py-5 text-left text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors border-t border-gray-200 w-full cursor-pointer mt-auto">
                Se déconnecter
            </button>
        </>
    );

    return (
        <>
            <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shrink-0 relative z-20">
                <h2 className="text-lg font-bold text-black tracking-tight">AcroMusic</h2>
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-black p-2 cursor-pointer focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            <div className="hidden md:flex flex-col h-screen w-64 bg-white border-r border-gray-200 shrink-0 sticky top-0">
                <MenuContent />
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity" onClick={closeMenu}></div>
            )}

            <div className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-black">Menu</h2>
                    <button onClick={closeMenu} className="text-gray-400 hover:text-black cursor-pointer p-1">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <MenuContent />
            </div>
        </>
    );
}