import {useState} from "react";
import axios from "axios";
import {useMutation, useQuery , useQueryClient} from "@tanstack/react-query";
import Dashboard from "../dashboard/dashboard.jsx";
import FormulaireAjoutAlbum from "../formulaire/formulaireAjoutAlbum.jsx"
import {Route, Routes} from "react-router-dom";
import {getAllCompositeurs,postCompositeur} from "../../services/compositeurService.js";
import FormulaireAjoutCompositeurs from "../formulaire/formulaireAjoutCompositeurs.jsx";
import TableauCompositeurs from "../dashboard/tableau/tableauCompositeurs.jsx";
import {postAlbum} from "../../services/albumService.js";

export default function PageAdmin(){

    const queryClient = useQueryClient();

    const [infosAlbum, setInfosAlbum] = useState({
        nomAlbum : '',
        description : '',
        isSingle : true,
        nombreDeTitres : 1,
        dateDeSortie : '',
        lienSpotify : '',
        lienDeezer: '',
        lienYoutubeMusic : '',
        lienAppleMusic : '',
        idCompositeur : 0,
        cover:''
    });

    const [infosCompositeur,setInfosCompositeur] = useState({
        nom:''
    })


    const options = [
        { text: "Album", value: "true" },
        { text: "Single", value: "false" }
    ];


    const { data: compositeurs, isLoading: chargementCompositeurs } = useQuery({
        queryKey: ['compositeurs'],
        queryFn: getAllCompositeurs
    })

    const handleChange = (e) => {
        // e.target.name est soit "username" soit "password" (selon l'input)
        // e.target.value est la lettre que l'utilisateur vient de taper
        const name = e.target.name;
        const value = e.target.value;
        const type = e.target.type;

        let valeurFinale = value;
        if (type === 'radio') {
            valeurFinale = (value === 'true');
        }
        else if (name === 'idCompositeur') {
            valeurFinale = Number(value);
        }else if (type === 'file') {
            valeurFinale = e.target.files[0];
        }

        setInfosAlbum((ancienneValeur) => ({
            ...ancienneValeur, // on récup ancien objet
            [name]: valeurFinale // on écrase le champ qui a changé
        }));
    }


// La nouvelle fonction pour le compositeur
    const handleChangeCompositeur = (e) => {
        const { name, value } = e.target; // equivalent à const name = e.target.name etc

        setInfosCompositeur((ancienneValeur) => ({
            ...ancienneValeur,
            [name]: value
        }));
    };


    const { mutate, isPending } = useMutation({
        mutationFn: async (infos) => {
            return await postCompositeur(infos);
        },
        onSuccess: (data) => {
            alert("Ajouté !");
            setInfosCompositeur({nom: ''});
            queryClient.invalidateQueries({ queryKey: ['compositeurs'] });
        },
        onError: (error) => {
            alert("Erreur : " + (error.response?.data?.message || "Erreur lors de l'ajout"));
        }
    });

    const { mutate : mutateAjoutAlbum, isPending : isPendingAlbum } = useMutation({
        mutationFn: async (infos) => {
            return await postAlbum(infos);
        },
        onSuccess: (data) => {
            alert("Ajouté !");
            setInfosAlbum({nomAlbum : '', description : '', isSingle : false, nombreDeTitres : 1, dateDeSortie : '', lienSpotify : '', lienDeezer: '', lienYoutubeMusic : '', lienAppleMusic : '', idCompositeur : 0})
        },
        onError: (error) => {
            alert("Erreur : " + (error.response?.data?.message || "Erreur lors de l'ajout"));
        }
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const donneesAlbum = {
            ...infosAlbum,
            nombreDeTitres: Number(infosAlbum.nombreDeTitres),
            compositeur: `/api/compositeurs/${infosAlbum.idCompositeur}`
        };

        delete donneesAlbum.idCompositeur;
        mutateAjoutAlbum(donneesAlbum);
    }

    const handleSubmitCompositeurs = async (e) => {
        e.preventDefault();
        mutate(infosCompositeur);
    }

    return (
        <div className="flex flex-row">
            <Dashboard></Dashboard>
            <Routes>
                <Route path="/" element={<h1>/admin/dashboard/</h1>}></Route>
                <Route path="/discographie" element={<h1>/admin/dashboard/discographie</h1>}></Route>
                <Route path="new" element={<FormulaireAjoutAlbum compositeurs={compositeurs || []} options={options} value={infosAlbum} onChange={handleChange} onSubmit={handleSubmit} isPending={isPendingAlbum} />}></Route>
                <Route path={"compositeurs"} element={
                    <div>
                        <FormulaireAjoutCompositeurs onSubmit={handleSubmitCompositeurs} value={infosCompositeur.nom} isPending={isPending} onChange={handleChangeCompositeur}/>
                        <TableauCompositeurs compositeurs={compositeurs || []}/>
                    </div>
                } ></Route>
            </Routes>
        </div>
    )
}

