import Card from "./card.jsx";

export default function Discographie({ albums, isPending }) {

    if (isPending || !albums) {
        return (
            <div className="pt-25 md:pt-[25vh] flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-2xl font-barlow text-gray-500">Chargement de la discographie...</p>
            </div>
        );
    }

    return (
        <div className="pt-25 md:pt-[25vh] pb-20 flex flex-col items-center w-full">
            <h1 className="pb-15 md:pb-[15vh] text-4xl sm:text-7xl md:text-8xl lg:text-[100px] font-black text-black uppercase tracking-tighter text-center px-4">
                Discographie
            </h1>

            {albums.length > 0 ? (
                <div className="w-[90%] max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-18">
                        {albums.map((album) => (
                        <Card key={album.id} album={album} />
                    ))}
                </div>
            ) : (
                <p className="text-center">Aucun album pour le moment...</p>
            )}
        </div>
    );
}