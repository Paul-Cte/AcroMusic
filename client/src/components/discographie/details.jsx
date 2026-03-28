import {Link, useParams} from "react-router-dom";

export default function Details({ albums }) {
    const { id } = useParams();
    const currentAlbum = albums?.find((album) => album.id === Number(id));


    if (!currentAlbum) {
        return <div className="pt-20 text-center">Album non trouvé</div>;
    }

    return (
        <div className="font-barlow pt-20 sm:pt-[20vh] max-w-6xl mx-auto px-6 pb-10 flex flex-col gap-10">

            <div className="text-sm text-gray-500 uppercase tracking-wide flex flex-row items-center gap-2">
                <Link to="/discographie" className="hover:underline">Discographie</Link>
                &gt; <p>{currentAlbum.nomAlbum}</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <img
                    src={currentAlbum.cover}
                    alt={currentAlbum.nomAlbum}
                    className="w-full lg:w-64 rounded-lg flex-1 shadow-md object-cover aspect-square"
                />

                <div className="flex-2 flex flex-col gap-4">

                    <div>
                    <h1 className="text-3xl sm:text-4xl uppercase font-bold">{currentAlbum.nomAlbum}</h1>
                    <h2 className="text-lg sm:text-xl uppercase italic font-semibold text-gray-600">{currentAlbum.isSingle ? "Single":"Album"}</h2>
                </div>
                    <p className="text-gray-800 text-lg">{currentAlbum.description}</p>

                    <hr/>
                    <div className="flex flex-col sm:flex-row sm:gap-6 text-sm text-gray-600">
                        <span className="text-lg"><strong>Sortie le :</strong> {new Date(currentAlbum.dateDeSortie).toLocaleDateString()}</span>
                        <span className="text-lg"><strong>Nombre de titres :</strong> {currentAlbum.nombreDeTitres}</span>
                        <span className="text-lg"><strong>Compositeur :</strong> {currentAlbum.compositeur.nom}</span>
                    </div>
                    <hr/>


                    <div className="flex flex-col  text-xl uppercase font-bold">
                        <h2>Écouter :</h2>
                        <div className="flex flex-row gap-4 mt-4 text-2xl">
                        {currentAlbum.lienSpotify && (
                            <a href={currentAlbum.lienSpotify} target="_blank" rel="noopener noreferrer" className="">
                                <i className="fi fi-brands-spotify"></i>
                            </a>
                        )}
                        {currentAlbum.lienDeezer && (
                            <a href={currentAlbum.lienDeezer} target="_blank" rel="noopener noreferrer" className="">
                                <i className="fi fi-brands-deezer"></i>
                            </a>
                        )}
                        {currentAlbum.lienAppleMusic && (
                            <a href={currentAlbum.lienAppleMusic} target="_blank" rel="noopener noreferrer" className="">
                                <i className="fi fi-sr-music-alt"></i>
                            </a>
                        )}
                        {currentAlbum.lienYoutubeMusic && (
                            <a href={currentAlbum.lienYoutubeMusic} target="_blank" rel="noopener noreferrer" className="">
                                <svg className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                    <path d="M 25 3 C 12.85 3 3 12.85 3 25 C 3 37.15 12.85 47 25 47 C 37.15 47 47 37.15 47 25 C 47 12.85 37.15 3 25 3 z M 25 11 C 32.72 11 39 17.28 39 25 C 39 32.72 32.72 39 25 39 C 17.28 39 11 32.72 11 25 C 11 17.28 17.28 11 25 11 z M 25 13 C 18.383 13 13 18.383 13 25 C 13 31.617 18.383 37 25 37 C 31.617 37 37 31.617 37 25 C 37 18.383 31.617 13 25 13 z M 22.019531 18.501953 C 22.194031 18.505203 22.366984 18.552484 22.521484 18.646484 L 31.521484 24.146484 C 31.817484 24.327484 32 24.651 32 25 C 32 25.349 31.818484 25.671516 31.521484 25.853516 L 22.521484 31.353516 C 22.361484 31.450516 22.181 31.5 22 31.5 C 21.832 31.5 21.663719 31.456094 21.511719 31.371094 C 21.195719 31.194094 21 30.861 21 30.5 L 21 19.5 C 21 19.139 21.195719 18.805906 21.511719 18.628906 C 21.670219 18.540906 21.845031 18.498703 22.019531 18.501953 z"/>
                                </svg>
                            </a>
                        )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Player Spotify */}
            {currentAlbum.lienSpotify && (
                <div className="mt-10">
                    {currentAlbum.isSingle ? (
                        <iframe
                        src={currentAlbum.linkForIframe}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-xl"
                    ></iframe>
                    ) : (
                    <iframe data-testid="embed-iframe"
                            src={currentAlbum.linkForIframe} className="rounded-xl"
                            width="100%" height="352" frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"></iframe>
                    )}
                </div>
            )}
        </div>
    );
}