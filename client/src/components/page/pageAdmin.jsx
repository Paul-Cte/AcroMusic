import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Route, Routes, useNavigate } from "react-router-dom";

import Dashboard from "../dashboard/dashboard.jsx";
import FormulaireAjoutAlbum from "../formulaire/formulaireAjoutAlbum.jsx"
import FormulaireModificationAlbum from "../formulaire/formulaireModificationAlbum.jsx";
import FormulaireAjoutCompositeurs from "../formulaire/formulaireAjoutCompositeurs.jsx";
import TableauCompositeurs from "../dashboard/tableau/tableauCompositeurs.jsx";
import TableauDiscographie from "../dashboard/tableau/tableauDiscographie.jsx";

import { getAllCompositeurs, postCompositeur } from "../../services/compositeurService.js";
import { deleteAlbum, getAllAlbums, postAlbum } from "../../services/albumService.js";

function AxiosInterceptor() {
    const navigate = useNavigate();

    useEffect(() => {
        // intercepte toutes les réponses HTTP
        const interceptor = axios.interceptors.response.use(
            (response) => response, // si c'est ok, ça passe
            (error) => {
                // si 401 (token expiré ou foireux), on tej l'user
                if (error.response && error.response.status === 401) {
                    console.warn("Token expiré, déconnexion automatique.");
                    localStorage.removeItem('token');
                    navigate('/');
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, [navigate]);

    return null;
}


export default function PageAdmin() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // -- SETUP & AUTH --

    // redirige direct vers l'accueil si y'a pas de token au montage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin');
        }
    }, [navigate]);


    // -- QUERIES (Data fetching) --

    // récupère la liste pour le tableau et les select des formulaires
    const { data: compositeurs, isLoading: chargementCompositeurs } = useQuery({
        queryKey: ['compositeurs'],
        queryFn: getAllCompositeurs
    });

    // récupère la data pour le composant TableauDiscographie
    const { data: albums, isLoading: chargementAlbums } = useQuery({
        queryKey: ['albums'],
        queryFn: getAllAlbums
    });


    // -- STATES (Formulaires) --

    // données tapées par l'user pour créer un album
    const [infosAlbum, setInfosAlbum] = useState({
        nomAlbum: '',
        description: '',
        isSingle: true,
        nombreDeTitres: 1,
        dateDeSortie: '',
        lienSpotify: '',
        lienDeezer: '',
        lienYoutubeMusic: '',
        lienAppleMusic: '',
        idCompositeur: 0,
        cover: ''
    });

    // données du petit form compositeur
    const [infosCompositeur, setInfosCompositeur] = useState({
        nom: ''
    });

    // petit utilitaire statique pour le select album/single
    const options = [
        { text: "Album", value: "false" },
        { text: "Single", value: "true" }
    ];


    // -- MUTATIONS (Écriture / Modif API) --

    // liée au form compositeur : push dans l'api et refresh la query des compo
    const { mutate: mutateCompositeur, isPending: isPendingCompositeur } = useMutation({
        mutationFn: async (infos) => await postCompositeur(infos),
        onSuccess: (data) => {
            setInfosCompositeur({ nom: '' }); // reset du champ
            queryClient.invalidateQueries({ queryKey: ['compositeurs'] });
        },
        onError: (error) => {
            alert("Erreur : " + (error.response?.data?.message || "Erreur lors de l'ajout"));
        }
    });

    // liée au form album : sauvegarde et refresh le tableau
    const { mutate: mutateAjoutAlbum, isPending: isPendingAlbum } = useMutation({
        mutationFn: async (infos) => await postAlbum(infos),
        onSuccess: (data) => {
            alert("Ajouté !");
            // gros reset du form après l'ajout
            setInfosAlbum({ nomAlbum: '', description: '', isSingle: false, nombreDeTitres: 1, dateDeSortie: '', lienSpotify: '', lienDeezer: '', lienYoutubeMusic: '', lienAppleMusic: '', idCompositeur: 0, cover: '' });
            queryClient.invalidateQueries({ queryKey: ['albums'] });
        },
        onError: (error) => {
            alert("Erreur : " + (error.response?.data?.message || "Erreur lors de l'ajout"));
        }
    });

    // gère la suppression d'un item du tableau des albums
    const mutationSuppression = useMutation({
        mutationFn: async (id) => {
            if (window.confirm("Es-tu sûr de vouloir supprimer cet album ou ce single ?")) {
                return await deleteAlbum(id);
            }
            throw new Error("Annulé");
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['albums'] }),
    });


    // -- HANDLERS (Changements inputs & Submits) --

    // met à jour infosAlbum dès qu'on touche un input
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        let valeurFinale = value;
        // petit fix selon le type d'input pour pas envoyer des strings à la place des bool/int
        if (type === 'radio') {
            valeurFinale = (value === 'true');
        } else if (name === 'idCompositeur') {
            valeurFinale = Number(value);
        }

        setInfosAlbum((ancienneValeur) => ({
            ...ancienneValeur,
            [name]: valeurFinale
        }));
    };

    // met à jour infosCompositeur
    const handleChangeCompositeur = (e) => {
        const { name, value } = e.target;
        setInfosCompositeur((ancienneValeur) => ({
            ...ancienneValeur,
            [name]: value
        }));
    };

    // formate un peu la donnée API Platform et déclenche l'ajout d'album
    const handleSubmit = async (e) => {
        e.preventDefault();

        const donneesAlbum = {
            ...infosAlbum,
            nombreDeTitres: Number(infosAlbum.nombreDeTitres),
            compositeur: `/api/compositeurs/${infosAlbum.idCompositeur}`
        };

        delete donneesAlbum.idCompositeur;
        mutateAjoutAlbum(donneesAlbum);
    };

    // déclenche l'ajout du compositeur
    const handleSubmitCompositeurs = async (e) => {
        e.preventDefault();
        mutateCompositeur(infosCompositeur);
    };

    // kill le cache, le token et renvoie à la connexion
    const handleDeconnexion = () => {
        localStorage.removeItem('token');
        queryClient.clear();
        navigate('/admin');
    };


    // -- RENDER --

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
            <Dashboard deconnexion={handleDeconnexion}></Dashboard>
            <div className="flex-1 overflow-y-auto p-4 md:p-10">
                <Routes>
                    <Route path="/" element={<TableauDiscographie albums={albums} isPending={chargementAlbums} />} />
                    <Route path="/discographie" element={<TableauDiscographie albums={albums} isPending={chargementAlbums} />} />
                    <Route path="/discographie/:id" element={<FormulaireModificationAlbum options={options} compositeurs={compositeurs || []} albums={albums} onSubmit={handleSubmit} />} />
                    <Route path="new" element={<FormulaireAjoutAlbum compositeurs={compositeurs || []} options={options} value={infosAlbum} onChange={handleChange} onSubmit={handleSubmit} isPending={isPendingAlbum} />} />
                    <Route path={"compositeurs"} element={
                        <div className="flex flex-col ">
                            <FormulaireAjoutCompositeurs onSubmit={handleSubmitCompositeurs} value={infosCompositeur.nom} isPending={isPendingCompositeur} onChange={handleChangeCompositeur} />
                            <TableauCompositeurs compositeurs={compositeurs || []} />
                        </div>
                    } />
                </Routes>
            </div>
        </div>
    );
}