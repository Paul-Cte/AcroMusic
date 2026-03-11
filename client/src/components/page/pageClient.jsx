import {useQuery} from "@tanstack/react-query";
import {getAllAlbums} from "../../services/albumService.js";
import {Route, Routes} from "react-router-dom";
import Menu from "../Menu/menu.jsx";
import Accueil from "./accueil.jsx";

export default function PageClient() {

    const { data: albums, isLoading } = useQuery({
        queryKey: ['albums'],
        queryFn: getAllAlbums
    });


    return (
        <div className="">
            <Menu></Menu>
            <div className="">
                <Routes>
                    <Route path="/" element={<Accueil albums={albums}/>} />
                    <Route path="/accueil" element={<Accueil albums={albums}/>} />
                    <Route path="/discographie" element={<h1>Discographie</h1>} />
                    <Route path="/discographie/:id" element={<h1>Discographie détail</h1>} />
                    <Route path="/contact" element={<h1>Contact</h1>} />
                </Routes>
            </div>
        </div>
    )
}