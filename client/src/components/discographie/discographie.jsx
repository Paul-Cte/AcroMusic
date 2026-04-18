import Card from "./card.jsx";
import { useEffect, useState, useRef } from "react";

export default function Discographie({ albums, isPending }) {
    const [ordre, setOrdre] = useState("recent"); // "recent" | "vieux"
    const [filtreType, setFiltreType] = useState("all"); // "all" | "album" | "single"
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        document.title = "AcroMusic | Discographie";

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (isPending || !albums) {
        return (
            <div className="pt-25 md:pt-[25vh] flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-2xl font-barlow text-gray-500">Chargement...</p>
            </div>
        );
    }

    // --- LOGIQUE COMBINÉE : FILTRE PUIS TRI ---
    const albumsAffiches = [...albums]
        // 1. Filtrage par type
        .filter(a => {
            if (filtreType === "all") return true;
            if (filtreType === "album") return a.isSingle === false;
            if (filtreType === "single") return a.isSingle === true;
            return true;
        })
        // 2. Tri par date
        .sort((a, b) => {
            const dateA = new Date(a.dateDeSortie);
            const dateB = new Date(b.dateDeSortie);
            return ordre === "recent" ? dateB - dateA : dateA - dateB;
        });

    return (
        <div className="pt-25 md:pt-[25vh] pb-20 flex flex-col items-center w-full">
            <h1 className="pb-10 md:pb-[10vh] text-4xl sm:text-7xl md:text-8xl lg:text-[100px] font-black text-black uppercase tracking-tighter text-center px-4">
                Discographie
            </h1>

            <div className="w-[90%] max-w-7xl flex justify-end mb-8 relative" ref={dropdownRef}>
                {/* Bouton Filtrer avec cursor-pointer */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 font-barlow font-bold uppercase tracking-widest text-sm hover:opacity-70 transition-opacity p-2 cursor-pointer"
                >
                    <span>filtrer</span>
                    <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 6.749h-28c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h28c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM24 14.75h-16c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h16c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM19 22.75h-6.053c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h6.053c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0z"></path>
                    </svg>
                </button>

                {/* Liste Déroulante */}
                {isOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">

                        {/* Section Tri */}
                        <div className="bg-gray-50 px-4 py-2 text-[10px] font-black uppercase text-gray-400 border-b border-gray-100">Ordre Chronologique</div>
                        <button
                            onClick={() => setOrdre("recent")}
                            className={`px-4 py-3 text-left text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer ${ordre === "recent" ? "bg-black text-white" : ""}`}
                        >
                            Plus récent au plus vieux
                        </button>
                        <button
                            onClick={() => setOrdre("vieux")}
                            className={`px-4 py-3 text-left text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer ${ordre === "vieux" ? "bg-black text-white" : ""}`}
                        >
                            Plus vieux au plus récent
                        </button>

                        {/* Section Type */}
                        <div className="bg-gray-50 px-4 py-2 text-[10px] font-black uppercase text-gray-400 border-b border-t border-gray-100">Type de sortie</div>
                        <button
                            onClick={() => setFiltreType("all")}
                            className={`px-4 py-3 text-left text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer ${filtreType === "all" ? "bg-black text-white" : ""}`}
                        >
                            Tout afficher
                        </button>
                        <button
                            onClick={() => setFiltreType("album")}
                            className={`px-4 py-3 text-left text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer ${filtreType === "album" ? "bg-black text-white" : ""}`}
                        >
                            Albums uniquement
                        </button>
                        <button
                            onClick={() => setFiltreType("single")}
                            className={`px-4 py-3 text-left text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer ${filtreType === "single" ? "bg-black text-white" : ""}`}
                        >
                            Singles uniquement
                        </button>
                    </div>
                )}
            </div>

            {/* Grille d'albums */}
            {albumsAffiches.length > 0 ? (
                <div className="w-[90%] max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-18">
                    {albumsAffiches.map((album) => (
                        <Card key={album.id} album={album} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <p className="font-barlow text-gray-500 italic">Aucun résultat pour ce filtre.</p>
                    <button onClick={() => {setFiltreType("all"); setOrdre("recent");}} className="mt-4 text-xs font-bold uppercase underline cursor-pointer">Réinitialiser</button>
                </div>
            )}
        </div>
    );
}