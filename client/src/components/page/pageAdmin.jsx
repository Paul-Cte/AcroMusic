import {useState,useEffect} from "react";
import axios from "axios";
import {useMutation, useQuery , useQueryClient} from "@tanstack/react-query";
import Dashboard from "../dashboard/dashboard.jsx";
import FormulaireAjoutAlbum from "../formulaire/formulaireAjoutAlbum.jsx"
import {Route, Routes, useNavigate} from "react-router-dom";
import {getAllCompositeurs,postCompositeur} from "../../services/compositeurService.js";
import FormulaireAjoutCompositeurs from "../formulaire/formulaireAjoutCompositeurs.jsx";
import TableauCompositeurs from "../dashboard/tableau/tableauCompositeurs.jsx";
import {deleteAlbum, getAllAlbums, postAlbum} from "../../services/albumService.js";
import TableauDiscographie from "../dashboard/tableau/tableauDiscographie.jsx";
import FormulaireModificationAlbum from "../formulaire/formulaireModificationAlbum.jsx";


function AxiosInterceptor() {
    const navigate = useNavigate();

    useEffect(() => {
        // On intercepte toutes les réponses HTTP
        const interceptor = axios.interceptors.response.use(
            (response) => response, // Si tout va bien, on laisse passer
            (error) => {
                // Si l'API répond 401 (Non autorisé / Token expiré)
                if (error.response && error.response.status === 401) {
                    console.warn("Token expiré, déconnexion automatique.");
                    localStorage.removeItem('token'); // On vide le token périmé
                    navigate('/'); // On renvoie vers la première page de l'app
                }
                return Promise.reject(error);
            }
        );

        // Nettoyage de l'intercepteur quand le composant est détruit
        return () => axios.interceptors.response.eject(interceptor);
    }, [navigate]);

    return null; // Il n'affiche rien à l'écran
}


export default function PageAdmin(){

    const navigate = useNavigate();
    const queryClient = useQueryClient();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // S'il n'y a pas de token, on renvoie sur la page de connexion
            navigate('/admin');
        }
    }, [navigate]);

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
        { text: "Album", value: "false" },
        { text: "Single", value: "true" }
    ];


    const { data: compositeurs, isLoading: chargementCompositeurs } = useQuery({
        queryKey: ['compositeurs'],
        queryFn: getAllCompositeurs
    })

    const {data : albums, isLoading: chargementAlbums} = useQuery({
        queryKey:['albums'],
        queryFn:getAllAlbums
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const type = e.target.type;

        let valeurFinale = value;
        if (type === 'radio') {
            valeurFinale = (value === 'true');
        }
        else if (name === 'idCompositeur') {
            valeurFinale = Number(value);
        }
        setInfosAlbum((ancienneValeur) => ({
            ...ancienneValeur, // on récup ancien objet
            [name]: valeurFinale // on écrase le champ qui a changé
        }));
    }

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
            setInfosAlbum({nomAlbum : '', description : '', isSingle : false, nombreDeTitres : 1, dateDeSortie : '', lienSpotify : '', lienDeezer: '', lienYoutubeMusic : '', lienAppleMusic : '', idCompositeur : 0, cover : ''});
            queryClient.invalidateQueries({queryKey: ['albums']});
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

    const handleDeconnexion = () => {
        localStorage.removeItem('token');
        queryClient.clear();
    }

    const mutationSuppression = useMutation({
        mutationFn: async (id) => {
            if (window.confirm("Es-tu sûr de vouloir supprimer cet album ou ce single ?")) {
                return await deleteAlbum(id);
            }
            throw new Error("Annulé");
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['albums'] }),
    });

    return (
        <div className="flex flex-row max-h-screen">
            <Dashboard deconnexion={handleDeconnexion}></Dashboard>
            <Routes>
                <Route path="/" element={<TableauDiscographie albums={albums} isPending={chargementAlbums}/>}></Route>
                <Route path="/discographie" element={<TableauDiscographie albums={albums} isPending={chargementAlbums}/>}></Route>
                <Route path="/discographie/:id" element={<FormulaireModificationAlbum options={options} compositeurs={compositeurs || []} albums={albums} onSubmit={handleSubmit}/>}></Route>
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

