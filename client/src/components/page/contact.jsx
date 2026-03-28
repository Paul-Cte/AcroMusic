import React from "react";

export default function Contact() {
    useEffect(() => {
        document.title = "AcroMusic | Contact";
    }, []);
    return (
        <div className="pt-25 md:pt-[25vh] pb-20 flex flex-col items-center w-full min-h-[80vh] font-barlow">
            <h1 className="pb-15 md:pb-[10vh] text-4xl sm:text-7xl md:text-8xl lg:text-[100px] font-black text-black uppercase tracking-tighter text-center px-4">
                Contact
            </h1>

            <div className="w-[90%] max-w-6xl bg-white rounded-lg p-8 sm:p-12 sm:py-25 flex flex-col lg:flex-row justify-around gap-10">

                <div className="flex flex-col items-center text-center gap-3 flex-1">
                    <i className="fi fi-rr-envelope text-4xl text-black"></i>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-black">M'écrire</h2>
                    <a href="mailto:contact@acromusic.fr" className="text-lg sm:text-xl text-gray-600 hover:text-black hover:underline transition-colors">
                        contact@acromusic.fr
                    </a>
                </div>

                <div className="w-full h-px lg:w-px lg:h-auto bg-gray-500"></div>

                <div className="flex flex-col items-center text-center gap-3 flex-1">
                    <i className="fi fi-brands-instagram text-4xl text-black"></i>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-black">Me suivre</h2>
                    <a href="https://www.instagram.com/acro_music__/" target="_blank" rel="noopener noreferrer" className="text-lg sm:text-xl text-gray-600 hover:text-black hover:underline transition-colors">
                        @acro_music__
                    </a>
                </div>

                <div className="w-full h-px lg:w-px lg:h-auto bg-gray-500"></div>

                <div className="flex flex-col items-center text-center gap-4 flex-1">
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-black">M'écouter</h2>
                    <div className="flex flex-row gap-6 mt-2 text-3xl sm:text-4xl text-gray-600 justify-center">
                        <a href="https://open.spotify.com/intl-fr/artist/6sV7WhdGOHr33W3H3zjnq3?si=U5CnvwNZR0yBxHQ-bppdIA" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                            <i className="fi fi-brands-spotify"></i>
                        </a>
                        <a href="https://link.deezer.com/s/32GGJ3jOlB2lbl9HRwL8s" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                            <i className="fi fi-brands-deezer"></i>
                        </a>
                        <a href="https://music.apple.com/us/album/cactus-single/1790862382" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                            <i className="fi fi-sr-music-alt"></i>
                        </a>
                        <a href="https://music.youtube.com/channel/UCmSI9IuLaaKGoNVDMB9xd8Q?si=bdGLTGLJfHxTlkf1" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                <path d="M 25 3 C 12.85 3 3 12.85 3 25 C 3 37.15 12.85 47 25 47 C 37.15 47 47 37.15 47 25 C 47 12.85 37.15 3 25 3 z M 25 11 C 32.72 11 39 17.28 39 25 C 39 32.72 32.72 39 25 39 C 17.28 39 11 32.72 11 25 C 11 17.28 17.28 11 25 11 z M 25 13 C 18.383 13 13 18.383 13 25 C 13 31.617 18.383 37 25 37 C 31.617 37 37 31.617 37 25 C 37 18.383 31.617 13 25 13 z M 22.019531 18.501953 C 22.194031 18.505203 22.366984 18.552484 22.521484 18.646484 L 31.521484 24.146484 C 31.817484 24.327484 32 24.651 32 25 C 32 25.349 31.818484 25.671516 31.521484 25.853516 L 22.521484 31.353516 C 22.361484 31.450516 22.181 31.5 22 31.5 C 21.832 31.5 21.663719 31.456094 21.511719 31.371094 C 21.195719 31.194094 21 30.861 21 30.5 L 21 19.5 C 21 19.139 21.195719 18.805906 21.511719 18.628906 C 21.670219 18.540906 21.845031 18.498703 22.019531 18.501953 z"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}