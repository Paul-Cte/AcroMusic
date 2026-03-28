import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";


export default function Menu(){
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getLinkClass = (path) => {
        const isActive = location.pathname.includes(path);
        return ` ${isActive ? "text-gray-600" : "hover:text-gray-600"}`;
    };

    const navigate = useNavigate();
    const goToAccueil = () => navigate('/accueil');

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

                <img src="acromusic_logo.png" className="w-35" onClick={goToAccueil}/>
            </div>

            {/*le menu sur pc*/}
            <div
                className="uppercase font-barlow font-semibold w-full hidden absolute top-0 left-0 md:flex h-[15vh] flex flex-row items-center justify-around text-[20px]">
                <img src="acromusic_logo.png" alt="logo AcroMusic" className="w-[240px]"></img>
                <div className="flex flex-row items-center gap-[50px]">
                    <MenuContent/>
                </div>
                <div className="flex justify-end gap-[20px] text-[25px] w-[200px]">
                    <a href="https://open.spotify.com/intl-fr/artist/6sV7WhdGOHr33W3H3zjnq3?si=U5CnvwNZR0yBxHQ-bppdIA" target="_blank" rel="noopener noreferrer">
                        <i className="fi fi-brands-spotify cursor-pointer"></i>
                    </a>
                    <a href="https://link.deezer.com/s/32GGJ3jOlB2lbl9HRwL8s" target="_blank" rel="noopener noreferrer">
                        <i className="fi fi-brands-deezer cursor-pointer"></i>
                    </a>
                    <a href="https://music.apple.com/us/album/cactus-single/1790862382" target="_blank" rel="noopener noreferrer">
                        <i className="fi fi-sr-music-alt cursor-pointer"></i>
                    </a>

                    <a href="https://music.youtube.com/channel/UCmSI9IuLaaKGoNVDMB9xd8Q?si=bdGLTGLJfHxTlkf1"  target="_blank" rel="noopener noreferrer">
                        <svg className="cursor-pointer"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                            <path d="M 25 3 C 12.85 3 3 12.85 3 25 C 3 37.15 12.85 47 25 47 C 37.15 47 47 37.15 47 25 C 47 12.85 37.15 3 25 3 z M 25 11 C 32.72 11 39 17.28 39 25 C 39 32.72 32.72 39 25 39 C 17.28 39 11 32.72 11 25 C 11 17.28 17.28 11 25 11 z M 25 13 C 18.383 13 13 18.383 13 25 C 13 31.617 18.383 37 25 37 C 31.617 37 37 31.617 37 25 C 37 18.383 31.617 13 25 13 z M 22.019531 18.501953 C 22.194031 18.505203 22.366984 18.552484 22.521484 18.646484 L 31.521484 24.146484 C 31.817484 24.327484 32 24.651 32 25 C 32 25.349 31.818484 25.671516 31.521484 25.853516 L 22.521484 31.353516 C 22.361484 31.450516 22.181 31.5 22 31.5 C 21.832 31.5 21.663719 31.456094 21.511719 31.371094 C 21.195719 31.194094 21 30.861 21 30.5 L 21 19.5 C 21 19.139 21.195719 18.805906 21.511719 18.628906 C 21.670219 18.540906 21.845031 18.498703 22.019531 18.501953 z"></path>
                        </svg>
                    </a>
                </div>

            </div>

            {/*L'overlay de fond*/}
            {isMenuOpen && (
                <div className="fixed top-0 left-0 h-full w-full z-49" onClick={closeMenuClient}></div>
            )}

            {/*le contenu du module sur mobile*/}
            <div  className={`pl-[15px] gap-[40px] uppercase font-barlow text-4xl flex flex-col z-50 text-white absolute top-0 left-0 h-full w-full pt-20 transform transition-transform duration-300 ease-in-out md:hidden bg-black ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Link onClick={closeMenuClient} to="/accueil">Accueil</Link>
                <Link onClick={closeMenuClient} to="/discographie">Discographie</Link>
                <Link onClick={closeMenuClient} to="/contact">Contact</Link>
                <img src="acromusic_logo_white.webp" className=" absolute bottom-0 left-1/2 -translate-x-1/2 w-45" onClick={goToAccueil}/>
            </div>
        </>
    )
}