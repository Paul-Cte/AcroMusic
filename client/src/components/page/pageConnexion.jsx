import FormulaireConnexion from "../formulaire/formulaireConnexion.jsx";
import {useState} from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";

export default function PageConnexion() {

    const [infosConnexion, setInfosConnexion] = useState({
        username : '',
        password : ''
    });

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
            const response = await axios.post("http://localhost/api/login_check", infosCo);
            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            alert("Connecté !");
        },
        onError: (error) => {
            alert("Erreur : " + (error.response?.data?.message || "Identifiants invalides"));
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate(infosConnexion);
    }

    return (
        <div className={"flex items-center justify-center h-dvh w-full bg-[#f2f2f2]"}>
            <FormulaireConnexion isPending={isPending} onSubmit={handleSubmit} value={infosConnexion} onChange={handleChange}></FormulaireConnexion>
        </div>
    )
}