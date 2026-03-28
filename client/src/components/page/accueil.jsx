import HeroAlbums from "../hero/heroalbums.jsx";
import HomeCard from "../discographie/homeCard.jsx";
import {Link} from "react-router-dom";
import {useEffect} from "react";


export default function Accueil({albums}){

    if (!albums) {
        return <div className="pt-[15vh] text-center">Chargement ...</div>;
    }

    const albumsTries = [...albums].sort((a, b) => new Date(b.dateDeSortie) - new Date(a.dateDeSortie));

    const troisDerniersAlbums = albumsTries.slice(0, 3);

    const albumMostRecent = troisDerniersAlbums[0];


    useEffect(() => {
        document.title = "AcroMusic | Accueil";
    }, []);


    return (
        <>
            <div className="pt-[15vh]">
                <HeroAlbums></HeroAlbums>
            </div>
            {albumMostRecent &&  (
            <div className="fixed bottom-0 w-full z-10">
                <iframe data-testid="embed-iframe" className="rounded-xl"
                        src={albumMostRecent.linkForIframe} width="100%"
                        height="80" frameBorder="0" allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy">
                </iframe>
            </div>
            )}
            <div className="flex flex-col items-center pb-[70px] pt-[70px] sm:pt-[15vh] h-auto bg-black [clip-path:polygon(0_5%,100%_0,100%_100%,0_100%)] sm:[clip-path:polygon(0_10%,100%_0,100%_100%,0_100%)]">
                <h2 className="hidden lg:block text-white uppercase text-4xl sm:text-5xl lg:text-6xl text-center font-barlow font-semibold">Dernières sorties</h2>
                <h2 className="block lg:hidden text-white uppercase text-4xl sm:text-5xl lg:text-6xl text-center font-barlow font-semibold">Dernière sortie</h2>
                {albums.length > 0 ? (
                    <div className="flex flex-row py-[70px]  sm:pt-[70px] sm:pb-[70px] justify-center gap-[90px] h-fit">
                        {albumsTries[0] &&
                        <HomeCard album={albumsTries[0]}/>
                        }
                        {albumsTries[1] &&
                            <div className="hidden lg:block">
                            <HomeCard album={albumsTries[1]}/>
                        </div>}
                        {albumsTries[2] &&
                            <div className="hidden 2xl:block">
                            <HomeCard album={albumsTries[2]}/>
                        </div>}
                    </div>
                ) : (
                    <p className="my-20 text-white">Aucun albums pour le moment</p>)}
                    <Link to="/discographie" className="text-2xl sm:text-3xl lg:text-4xl text-center font-barlow font-semibold border border-white bg-black text-white px-5 py-2.5 w-fit cursor-pointer hover:bg-white hover:text-black uppercase transition-colors">Voir discographie</Link>
            </div>
        </>
    )
}