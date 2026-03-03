import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompositeur, modifyCompositeur } from "../../../services/compositeurService.js";

export default function TableauCompositeurs({ compositeurs }) {
    const queryClient = useQueryClient();

    const [editingId, setEditingId] = useState(null); // L'ID de la ligne en cours de modif
    const [editName, setEditName] = useState("");     // Le texte tapé dans l'input

    const mutationSuppression = useMutation({
        mutationFn: async (id) => {
            if (window.confirm("Es-tu sûr de vouloir supprimer ce compositeur ?")) {
                return await deleteCompositeur(id);
            }
            throw new Error("Annulé");
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['compositeurs'] }),
        onError: (error) => {
            alert("Erreur : " + (error.response?.data?.message || "Erreur lors de la supression, des albums contiennent peut-être ce compositeur"));
        }
    });

    const mutationModification = useMutation({
        mutationFn: async () => {
            return await modifyCompositeur(editingId, { nom: editName });
        },
        onSuccess: () => {
            // On quitte le mode édition et on rafraîchit
            setEditingId(null);
            queryClient.invalidateQueries({ queryKey: ['compositeurs'] });
        },
        onError: () => alert("Erreur lors de la modification.")
    });

    // --- HANDLERS POUR LES BOUTONS ---
    const handleEditClick = (comp) => {
        setEditingId(comp.id); // On active le mode édition sur cette ligne
        setEditName(comp.nom); // On pré-remplit l'input avec le nom actuel
    };

    const handleCancelClick = () => {
        setEditingId(null); // On annule en remettant l'ID à null
    };

    return (
        <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Liste des compositeurs</h2>
            <table className="w-full border-collapse border border-gray-300 bg-white">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border border-gray-300 p-2 text-left">ID</th>
                    <th className="border border-gray-300 p-2 text-left">Compositeur</th>
                    <th className="border border-gray-300 p-2 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {compositeurs?.length > 0 ? (compositeurs.map((comp) => (
                        <tr key={comp.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2">{comp.id}</td>

                            {/* COLONNE DU NOM : Input ou Texte selon le mode */}
                            <td className="border border-gray-300 p-2">
                                {editingId === comp.id ? (
                                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="border border-blue-500 p-1 rounded w-full" autoFocus/>
                                ) : (comp.nom)}
                            </td>

                            {/* COLONNE ACTIONS : Boutons diffèrent selon le mode */}
                            <td className="border border-gray-300 p-2 flex justify-center gap-2">
                                {editingId === comp.id ? (
                                    <>
                                        {/* BOUTONS MODE SAUVEGARDE */}
                                        <button onClick={() => mutationModification.mutate()} disabled={mutationModification.isPending} className="bg-green-500 text-white px-3 py-1 rounded text-sm disabled:bg-green-300 cursor-pointer">{mutationModification.isPending ? '...' : 'Valider'}</button>
                                        <button onClick={handleCancelClick} className="bg-gray-500 text-white px-3 py-1 rounded text-sm cursor-pointer">Annuler</button>
                                    </>
                                ) : (
                                    <>
                                        {/* BOUTONS MODE NORMAL */}
                                        <button onClick={() => handleEditClick(comp)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer">Modifier</button>
                                        <button onClick={() => mutationSuppression.mutate(comp.id)} disabled={mutationSuppression.isPending} className="bg-red-500 text-white px-3 py-1 rounded text-sm disabled:bg-red-300 cursor-pointer">Supprimer</button></>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="border border-gray-300 p-4 text-center text-gray-500">
                            Aucun compositeur trouvé.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}