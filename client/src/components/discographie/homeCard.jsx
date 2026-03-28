import {useNavigate} from "react-router-dom";

export default function HomeCard({album}){

    const navigate = useNavigate();

    function handleClick(id){
        navigate(`/discographie/${id}`);
    }

    return (
        <div onClick={()=> handleClick(album.id)} className="group transition ease-in-out duration-200 hover:scale-[0.98] flex flex-col gap-[3px] sm:gap-[0px] justify-between text-white w-[80%] sm:w-auto sm:h-[460px]">
            <img className="cursor-pointer aspect-square sm:w-[400px] bg-white object-cover ease-in-out duration-200 hover:transform-[scale(0.98)]" src={album.cover} alt="cover d'album"/>
            <label className="uppercase  font-barlow font-semibold text-base sm:text-lg lg:text-xl">{album.nomAlbum}</label>
            <label className="font-barlow group-hover:underline text-sm sm:text-base lg:text-lg font-semibold italic">Voir {album.isSingle ? "single" : "album"}</label>
        </div>
    )
}