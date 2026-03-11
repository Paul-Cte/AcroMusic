import {useNavigate, useParams} from "react-router-dom";
import RadioGroup from "./formulaireComponents/radioGroup.jsx";
import Input from "./formulaireComponents/input.jsx";
import Select from "./formulaireComponents/select.jsx";
import ButtonSubmit from "./formulaireComponents/buttonSubmit.jsx";
import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {modifyAlbum, postAlbum} from "../../services/albumService.js";
import {getAllCompositeurs} from "../../services/compositeurService.js";

export default function FormulaireModificationAlbum({albums,compositeurs,options}){
    const navigate = useNavigate();

    const queryClient = useQueryClient();


    const [infosAlbum, setInfosAlbum] = useState({
        nomAlbum: '',
        description: '',
        isSingle: false,
        nombreDeTitres: 1,
        dateDeSortie: '',
        lienSpotify: '',
        lienDeezer: '',
        lienYoutubeMusic: '',
        lienAppleMusic: '',
        idCompositeur: 0,
        cover: '',
    });

    const { id } = useParams();
    const currentAlbum = albums?.find((album)=> album.id === Number(id));

    useEffect(() => {
        if (currentAlbum) {
            const dateFormatee = currentAlbum.dateDeSortie
                ? currentAlbum.dateDeSortie.split('T')[0]
                : '';
            setInfosAlbum({
                nomAlbum: currentAlbum.nomAlbum || '',
                description: currentAlbum.description || '',
                isSingle: currentAlbum.isSingle || false,
                nombreDeTitres: currentAlbum.nombreDeTitres || 1,
                dateDeSortie: dateFormatee,
                lienSpotify: currentAlbum.lienSpotify || '',
                lienDeezer: currentAlbum.lienDeezer || '',
                lienYoutubeMusic: currentAlbum.lienYoutubeMusic || '',
                lienAppleMusic: currentAlbum.lienAppleMusic || '',
                idCompositeur: currentAlbum.compositeur.id || 0,
                cover: currentAlbum.cover || '',
            });
        }
    }, [currentAlbum]);


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let valeurFinale = value;

        if (type === 'radio') valeurFinale = (value === 'true');
        else if (name === 'idCompositeur') valeurFinale = Number(value);
        else if (type === 'file') valeurFinale = e.target.files[0];

        setInfosAlbum(prev => ({ ...prev, [name]: valeurFinale }));
    };

    const { mutate : mutateModifAlbum, isPending : isPendingAlbum } = useMutation({
        mutationFn: async (infos) => {
            return await modifyAlbum(id,infos);
        },
        onSuccess: (data) => {
            alert("Modifié !");
            navigate('/admin/dashboard/discographie/');
            queryClient.invalidateQueries({queryKey: ['albums']});
        },
        onError: (error) => {
            alert("Erreur : " + (error.response?.data?.message || "Erreur lors de la modif"));
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
        mutateModifAlbum(donneesAlbum);
    }



    if (!currentAlbum) {
        return <div className="p-8 text-center text-gray-500">Chargement des données de l'album...</div>;
    }

    return(
        <div className="w-full max-w-4xl mt-8 pb-12">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-black tracking-tight">Modifier la sortie</h2>
                <p className="text-sm text-gray-500 mt-1">Modification de : <span className="font-medium text-black">{currentAlbum.nomAlbum}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col gap-8">
                <RadioGroup text={"Type de sortie"} name={"isSingle"} value={infosAlbum.isSingle} onChange={handleChange} isPending={isPendingAlbum} options={options}></RadioGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input name={"nomAlbum"} labelName={"Titre"} value={infosAlbum.nomAlbum} onChange={handleChange} placeholder={"L'enfant de la pluie"} isRequired={true}></Input>
                    <Select text={"Choisir le compositeur"} name={"idCompositeur"} isPending={isPendingAlbum} value={infosAlbum.idCompositeur} onChange={handleChange} options={compositeurs}></Select>
                    <Input isPending={isPendingAlbum} name={"dateDeSortie"} labelName={"Date de sortie"} value={infosAlbum.dateDeSortie} type={"date"} onChange={handleChange} isRequired={true}></Input>
                    <Input isPending={isPendingAlbum} name={"nombreDeTitres"} labelName={"Nombre de titres"} value={infosAlbum.nombreDeTitres} onChange={handleChange} type={"number"} isRequired={true}></Input>
                </div>

                <Input isPending={isPendingAlbum} name={"description"} labelName={"Description"} value={infosAlbum.description} onChange={handleChange} placeholder={"Cet album est..."}></Input>

                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-800 mb-4">Plateformes de streaming</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input isPending={isPendingAlbum} type={"url"} name={"lienSpotify"} labelName={"Lien Spotify *"} value={infosAlbum.lienSpotify} onChange={handleChange} isRequired={true} placeholder="https://open.spotify..."></Input>
                        <Input isPending={isPendingAlbum} type={"url"} name={"lienDeezer"} labelName={"Lien Deezer"} value={infosAlbum.lienDeezer} onChange={handleChange} placeholder="https://www.deezer.com/..."/>
                        <Input isPending={isPendingAlbum} type={"url"} name={"lienYoutubeMusic"} labelName={"Lien YouTube Music"} value={infosAlbum.lienYoutubeMusic} onChange={handleChange} placeholder="https://music.youtube.com/..."/>
                        <Input isPending={isPendingAlbum} type={"url"} name={"lienAppleMusic"} labelName={"Lien Apple Music"} value={infosAlbum.lienAppleMusic} onChange={handleChange} placeholder="https://music.apple.com/..."/>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <Input isPending={isPendingAlbum} type={"url"} name={"cover"} labelName={"Lien de l'image de la cover"} value={infosAlbum.cover || ''} placeholder={"https://..."}  onChange={handleChange} disabled={false} />
                </div>

                <div className="flex justify-end gap-4 pt-4 mt-2">
                    <button type="button" onClick={() => navigate('/admin/dashboard/discographie')} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer">Annuler</button>
                    <ButtonSubmit isPending={isPendingAlbum} text={"Enregistrer les modifications"}></ButtonSubmit>
                </div>
            </form>
        </div>
    )
}