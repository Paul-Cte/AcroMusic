import {Link, useLocation} from "react-router-dom";
import {useState} from "react";


export default function Menu(){
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getLinkClass = (path) => {
        const isActive = location.pathname.includes(path);
        return ` ${isActive ? "text-gray-600" : "hover:text-gray-600"}`;
    };

    const closeMenuClient = () => setIsMenuOpen(false);

    const MenuContent = () => (
        <>
                <Link onClick={closeMenuClient} className={getLinkClass("/accueil")} to="/accueil">Accueil</Link>
                <Link onClick={closeMenuClient} className={getLinkClass("/discographie")} to="/discographie">Discographie</Link>
                <Link onClick={closeMenuClient} className={getLinkClass("/contact")} to="/contact">Contact</Link>
        </>
    );

    return (
        <>
            {/*le menu hamburger sur mobile*/}
            <div className="md:hidden absolute top-0 left-0 w-full flex flex-row justify-between h-15 items-center px-[10px]">
                <button className=" flex flex-col justify-center items-start w-[45px] h-[40px] gap-[8px]  z-60" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className={`block h-[3px] w-[40px] bg-black rounded transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[11px] bg-white" : ""}`}/>
                    <span className={`block h-[3px] w-[40px] bg-black rounded transition-all duration-300 ${isMenuOpen ? "opacity-0 bg-white" : ""}`}/>
                    <span className={`block h-[3px] w-[25px] bg-black rounded transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[11px] w-[40px] bg-white" : ""}`}/>
                </button>

                <img src="/public/acromusic_logo.png" className="w-35"/>
            </div>

            {/*le menu sur pc*/}
            <div
                className="uppercase font-barlow font-semibold w-full hidden absolute top-0 left-0 md:flex h-[15vh] flex flex-row items-center justify-around text-[20px]">
                <img src="/public/acromusic_logo.png" alt="logo AcroMusic" className="w-[240px]"></img>
                <div className="flex flex-row items-center gap-[50px]">
                    <MenuContent/>
                </div>
                <div className="flex justify-end gap-[20px] text-[25px] w-[200px]">
                    <i className="fi fi-brands-spotify cursor-pointer"></i>
                    <i className="fi fi-brands-deezer cursor-pointer"></i>
                    <i className="fi fi-sr-music-alt cursor-pointer"></i>
                </div>

            </div>

            {/*L'overlay de fond*/}
            {isMenuOpen && (
                <div className="fixed top-0 left-0 h-full w-full z-49" onClick={closeMenuClient}></div>
            )}

            {/*le contenu du module sur mobile*/}
            <div  className={`pl-[15px] gap-[40px] uppercase font-barlow text-4xl flex flex-col z-50 text-white absolute top-0 left-0 h-full w-full pt-20 transform transition-transform duration-300 ease-in-out md:hidden bg-black ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <MenuContent />
            </div>
        </>
    )
}