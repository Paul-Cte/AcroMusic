import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCompositeur} from "../../../services/compositeurService.js";
import {deleteAlbum} from "../../../services/albumService.js";

export default function TableauDiscographie ({albums,isPending}){

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutationSuppression = useMutation({
        mutationFn: async (id) => {
            if (window.confirm("Es-tu sûr de vouloir supprimer cet album ?")) {
                return await deleteAlbum(id);
            }
            throw new Error("Annulé");
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['albums'] }),
    });

    return (
        <div className="mt-8 w-fit max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Liste des albums</h2>
            <table className="w-full border-collapse border border-gray-300 bg-white">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border border-gray-300 p-2 text-left">ID</th>
                    <th className="border border-gray-300 p-2 text-left">Nom de l'album</th>
                    <th className="border border-gray-300 p-2 text-left">Type</th>
                    <th className="border border-gray-300 p-2 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {albums?.length > 0 ? (albums.map((album) => (
                        <tr key={album.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2">{album.id}</td>
                            <td className="border border-gray-300 p-2">{album.nomAlbum}</td>
                            <td className="border border-gray-300 p-2">{album.isSingle ? "Single" : "Album"}</td>
                            <td className="border border-gray-300 p-2 flex justify-center gap-2">
                                <button type="button" onClick={()=>navigate('/admin/dashboard/discographie/' + album.id)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer">Modifier</button>
                                <button type="button" onClick={() => mutationSuppression.mutate(album.id)} disabled={mutationSuppression.isPending} className="bg-red-500 text-white px-3 py-1 rounded text-sm cursor-pointer">Supprimer</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="border border-gray-300 p-4 text-center text-gray-500">
                            Aucun album trouvé.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}