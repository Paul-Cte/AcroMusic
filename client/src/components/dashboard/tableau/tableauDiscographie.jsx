import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
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
        <div className="w-full max-w-4xl pb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-black tracking-tight">Discographie</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
                    <tr>
                        <th className="px-6 py-4">Nom de l'album</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {albums?.length > 0 ? (albums.map((album) => (
                            <tr key={album.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-black">{album.nomAlbum}</td>
                                <td className="px-6 py-4 text-gray-600">{album.isSingle ? "Single" : "Album"}</td>
                                <td className="px-6 py-4 flex flex-col md:flex-row justify-end gap-3">
                                    <button type="button" onClick={()=>navigate('/admin/dashboard/discographie/' + album.id)} className="text-gray-600 hover:text-black text-sm font-medium cursor-pointer transition-colors">Modifier</button>
                                    <button type="button" onClick={() => mutationSuppression.mutate(album.id)} disabled={mutationSuppression.isPending} className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer transition-colors disabled:opacity-50">Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                Aucun album trouvé.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}