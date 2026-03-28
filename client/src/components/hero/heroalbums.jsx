export default function HeroAlbums() {
    return (
        <div className="flex flex-col gap-[10px] items-center pt-[100px] md:pt-[0px] md:justify-center relative h-[calc(85vh-80px)] mb-[80px]  bg-white">

            <div className="relative w-64 h-64 mb-8 sm:mb-16 flex items-center justify-center">
                <div data-aos="fade-right" className="absolute z-10 -translate-x-18 sm:-translate-x-52 translate-y-3">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gray-200 rounded-2xl shadow-xl transform -rotate-4 transition-all duration-300 hover:rotate-0 overflow-hidden">
                        <img src="cover1.png" alt="Album 1" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div data-aos="fade-right" className="absolute z-20 -translate-y-4 -translate-x-0 sm:-translate-x-22">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gray-300 rounded-2xl shadow-2xl transform -rotate-1 transition-all duration-300 hover:rotate-0 overflow-hidden">
                        <img src="cover4.png" alt="Album 2" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div data-aos="fade-left" className="absolute z-30 translate-x-18 sm:translate-x-18 translate-y-3">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gray-400 rounded-2xl shadow-2xl transform rotate-4 transition-all duration-300 hover:rotate-0 overflow-hidden">
                        <img src="cover3.png" alt="Album 3" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div data-aos="fade-left" className="sm:absolute z-40 invisible sm:visible sm:translate-x-50 -translate-y-7">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-4xl shadow-xl transform -rotate-4 transition-all duration-300 hover:rotate-0 overflow-hidden">
                        <img src="cover2.png" alt="Album 4" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="text-center z-0 relative -mt-4 sm:-mt-12 px-4">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-black text-black uppercase tracking-tighter ">
                    COMPOSITEUR,<br/>ARTISTE & CRÉATEUR
                </h1>
            </div>

        </div>
    )
}