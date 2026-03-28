import {useNavigate} from "react-router-dom";

export default function Card({album}){

    const navigate = useNavigate();

    function handleClick(id){
        navigate(`/discographie/${id}`);
    }

    return (
        <div data-aos="zoom-in" data-aos-duration="400" onClick={()=> handleClick(album.id)} className="group flex flex-col items-center w-full cursor-pointer transition ease-in-out duration-200 hover:scale-[0.98]">
            <img
                className="aspect-square w-full object-cover "
                src={album.cover}
                alt={album.nomAlbum}
            />
            <label className="uppercase font-barlow font-semibold text-base sm:text-lg lg:text-xl mt-2">{album.nomAlbum}</label>
            <label className="font-barlow group-hover:underline text-sm sm:text-base lg:text-lg font-semibold italic">Voir {album.isSingle ? "single" : "album"}</label>
        </div>
    )
}