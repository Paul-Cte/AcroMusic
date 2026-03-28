import {useQuery} from "@tanstack/react-query";
import {getAllAlbums} from "../../services/albumService.js";
import {Route, Routes, Navigate} from "react-router-dom";
import Menu from "../Menu/menu.jsx";
import Accueil from "./accueil.jsx";
import Discographie from "../discographie/discographie.jsx";
import Footer from "../footer/footer.jsx";
import Details from "../discographie/details.jsx";
import Contact from "./contact.jsx";
import MentionsLegales from "./mentionsLegales.jsx";

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
                    <Route path="/" element={<Navigate to="/accueil" replace/>} />
                    <Route path="/accueil" element={<Accueil albums={albums}/>} />
                    <Route path="/discographie" element={<Discographie isPending={isLoading} albums={albums}/>} />
                    <Route path="/discographie/:id" element={<Details albums={albums}/>} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/mentions-legales" element={<MentionsLegales/>}/>
                </Routes>
            </div>
            <Footer></Footer>
        </div>
    )
}