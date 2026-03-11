import HeroAlbums from "../hero/heroalbums.jsx";


export default function Accueil({albums}){

    if (!albums || albums.length === 0) {
        return <div className="pt-[15vh] text-center">Chargement ...</div>;
    }

    // 2. Maintenant on est sûr que albums existe, on prend le premier
    const album = albums[0];
    console.log(album);


    return (
        <>
            <div className="pt-[15vh]">
                <HeroAlbums></HeroAlbums>
            </div>
            <div className="fixed bottom-0 w-full">
                <iframe data-testid="embed-iframe" style={{borderRadius:"12px"}}
                        src={album.linkForIframe} width="100%"
                        height="80" frameBorder="0" allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy">
                </iframe>
            </div>
            <div className="h-screen bg-gray-950">

            </div>

        </>
    )
}