import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="font-barlow relative bg-black text-white px-6 py-10 border-t z-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg mb-2">Navigation</h3>

                    <Link to="/" className="hover:underline">Accueil</Link>
                    <Link to="/discographie" className="hover:underline">Discographie</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                    <Link to="/mentions-legales" className="hover:underline">Mentions légales</Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg mb-2">Réseaux</h3>
                    <a href="https://www.instagram.com/acro_music__/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <i className="fi fi-brands-instagram"></i>
                        Instagram
                    </a>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg mb-2">Écouter</h3>

                    <div className="flex gap-4 text-2xl">
                        <a href="https://open.spotify.com/intl-fr/artist/6sV7WhdGOHr33W3H3zjnq3?si=U5CnvwNZR0yBxHQ-bppdIA" target="_blank" rel="noopener noreferrer">
                            <i className="fi fi-brands-spotify cursor-pointer"></i>
                        </a>

                        <a href="https://link.deezer.com/s/32GGJ3jOlB2lbl9HRwL8s" target="_blank" rel="noopener noreferrer">
                            <i className="fi fi-brands-deezer cursor-pointer"></i>
                        </a>

                        <a href="https://music.apple.com/us/album/cactus-single/1790862382" target="_blank" rel="noopener noreferrer">
                            <i className="fi fi-sr-music-alt cursor-pointer"></i>
                        </a>

                        <a href="https://music.youtube.com/channel/UCmSI9IuLaaKGoNVDMB9xd8Q?si=bdGLTGLJfHxTlkf1" target="_blank" rel="noopener noreferrer">
                            <svg className="cursor-pointer fill-white" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50">
                                <path d="M 25 3 C 12.85 3 3 12.85 3 25 C 3 37.15 12.85 47 25 47 C 37.15 47 47 37.15 47 25 C 47 12.85 37.15 3 25 3 z M 25 11 C 32.72 11 39 17.28 39 25 C 39 32.72 32.72 39 25 39 C 17.28 39 11 32.72 11 25 C 11 17.28 17.28 11 25 11 z M 25 13 C 18.383 13 13 18.383 13 25 C 13 31.617 18.383 37 25 37 C 31.617 37 37 31.617 37 25 C 37 18.383 31.617 13 25 13 z M 22.019531 18.501953 C 22.194031 18.505203 22.366984 18.552484 22.521484 18.646484 L 31.521484 24.146484 C 31.817484 24.327484 32 24.651 32 25 C 32 25.349 31.818484 25.671516 31.521484 25.853516 L 22.521484 31.353516 C 22.361484 31.450516 22.181 31.5 22 31.5 C 21.832 31.5 21.663719 31.456094 21.511719 31.371094 C 21.195719 31.194094 21 30.861 21 30.5 L 21 19.5 C 21 19.139 21.195719 18.805906 21.511719 18.628906 C 21.670219 18.540906 21.845031 18.498703 22.019531 18.501953 z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-400 mt-10">
                © {new Date().getFullYear()} AcroMusic — Tous droits réservés
            </div>
        </footer>
    );
}