import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompositeur, modifyCompositeur } from "../../../services/compositeurService.js";

export default function TableauCompositeurs({ compositeurs }) {
    const queryClient = useQueryClient();

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");

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
            setEditingId(null);
            queryClient.invalidateQueries({ queryKey: ['compositeurs'] });
        },
        onError: () => alert("Erreur lors de la modification.")
    });

    const handleEditClick = (comp) => {
        setEditingId(comp.id);
        setEditName(comp.nom);
    };

    const handleCancelClick = () => {
        setEditingId(null);
    };

    return (
        <div className="w-full max-w-4xl">
            <div className="bg-white border border-gray-200 rounded-b-lg overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
                    <tr>
                        <th className="px-6 py-4">Compositeur</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {compositeurs?.length > 0 ? (compositeurs.map((comp) => (
                            <tr key={comp.id} className="hover:bg-gray-50 transition-colors">

                                <td className="px-6 py-4">
                                    {editingId === comp.id ? (
                                        <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="border border-gray-300 px-3 py-1.5 rounded-md focus:outline-none focus:border-black w-full text-sm" autoFocus/>
                                    ) : (
                                        <span className="font-medium text-black">{comp.nom}</span>
                                    )}
                                </td>

                                <td className="px-6 py-4 flex flex-col md:flex-row justify-end gap-4">
                                    {editingId === comp.id ? (
                                        <>
                                            <button onClick={() => mutationModification.mutate()} disabled={mutationModification.isPending} className="text-black font-medium hover:text-gray-600 text-sm cursor-pointer disabled:opacity-50">{mutationModification.isPending ? '...' : 'Valider'}</button>
                                            <button onClick={handleCancelClick} className="text-gray-500 hover:text-black font-medium text-sm cursor-pointer">Annuler</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(comp)} className="text-gray-600 hover:text-black font-medium text-sm cursor-pointer transition-colors">Modifier</button>
                                            <button onClick={() => mutationSuppression.mutate(comp.id)} disabled={mutationSuppression.isPending} className="text-red-500 hover:text-red-700 font-medium text-sm cursor-pointer transition-colors disabled:opacity-50">Supprimer</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                Aucun compositeur trouvé.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}