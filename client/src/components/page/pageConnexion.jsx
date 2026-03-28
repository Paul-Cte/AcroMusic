import FormulaireConnexion from "../formulaire/formulaireConnexion.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

export default function PageConnexion() {
    useEffect(() => {
        document.title = "AcroMusic | Connexion";
    }, []);
    const navigate = useNavigate();

    const [infosConnexion, setInfosConnexion] = useState({
        username : '',
        password : ''
    });

    const [nbrEssai, setNbrEssai] = useState(0);

    const disabled = nbrEssai >= 4;

    const handleChange = (e) => {
            // e.target.name est soit "username" soit "password" (selon l'input)
            // e.target.value est la lettre que l'utilisateur vient de taper
            const name = e.target.name;
            const value = e.target.value;

            setInfosConnexion((ancienneValeur) => ({
                ...ancienneValeur, // on récup ancien objet
                [name]: value // on écrase le champ qui a changé
            }));
    }

    const { mutate, isPending } = useMutation({
        mutationFn: async (infosCo) => {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login_check`, infosCo);
            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            navigate('/admin/dashboard/discographie');
        },
        onError: (error) => {
            if (error.response && error.response.status === 429) {
                alert("Sécurité : Trop de tentatives. L'accès est temporairement bloqué par le serveur.");
            } else {
                alert("Erreur : Identifiants invalides ");
               setNbrEssai((ancienNombre) => ancienNombre + 1);
           }
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
            mutate(infosConnexion);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50">
            <FormulaireConnexion disabled={disabled || isPending} isPending={isPending} onSubmit={handleSubmit} value={infosConnexion} onChange={handleChange}></FormulaireConnexion>
            {disabled && (
                <p className="mt-4 text-red-500 font-semibold">
                    Trop de tentatives échouées. Veuillez réessayer plus tard.
                </p>
            )}
        </div>
    )
}