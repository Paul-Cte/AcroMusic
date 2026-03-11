import ButtonSubmit from "./formulaireComponents/buttonSubmit.jsx";
import Input from "./formulaireComponents/input.jsx";
import RadioGroup from "./formulaireComponents/radioGroup.jsx";
import Select from "./formulaireComponents/select.jsx";

export default function FormulaireAjoutAlbum({value,onChange,onSubmit,isPending,options,compositeurs}){
    return  (
        <div className="w-full max-w-4xl pb-12">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-black tracking-tight">Nouvelle sortie</h2>
                <p className="text-sm text-gray-500 mt-1">Renseignez les informations pour ajouter un album ou un single.</p>
            </div>

            <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col gap-8">
                <RadioGroup text={"Type de sortie"} name={"isSingle"} value={value.isSingle} onChange={onChange} isPending={isPending} options={options}></RadioGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input name={"nomAlbum"} labelName={"Titre *"} value={value.nomAlbum} onChange={onChange} placeholder={"L'enfant de la pluie"} isRequired={true}></Input>
                    <Select text={"Choisir le compositeur *"} name={"idCompositeur"} isPending={isPending} value={value.idCompositeur} onChange={onChange} options={compositeurs}></Select>
                    <Input isPending={isPending} name={"dateDeSortie"} labelName={"Date de sortie *"} value={value.dateDeSortie} type={"date"} onChange={onChange} isRequired={true}></Input>
                    <Input isPending={isPending} name={"nombreDeTitres"} labelName={"Nombre de titres *"} value={value.nombreDeTitres} onChange={onChange} type={"number"} isRequired={true}></Input>
                </div>

                <Input isPending={isPending} name={"description"} labelName={"Description"} value={value.description} onChange={onChange} placeholder={"Cet album est..."}></Input>

                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-800 mb-4">Plateformes de streaming</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input isPending={isPending} type={"url"} name={"lienSpotify"} labelName={"Lien Spotify *"} value={value.lienSpotify} onChange={onChange} isRequired={true} placeholder="https://open.spotify..."></Input>
                        <Input isPending={isPending} type={"url"} name={"lienDeezer"} labelName={"Lien Deezer"} value={value.lienDeezer} onChange={onChange} placeholder="https://www.deezer.com/..."/>
                        <Input isPending={isPending} type={"url"} name={"lienYoutubeMusic"} labelName={"Lien YouTube Music"} value={value.lienYoutubeMusic} onChange={onChange} placeholder="https://music.youtube.com/..."/>
                        <Input isPending={isPending} type={"url"} name={"lienAppleMusic"} labelName={"Lien Apple Music"} value={value.lienAppleMusic} onChange={onChange} placeholder="https://music.apple.com/..."/>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <Input isPending={isPending} type={"url"} name={"cover"} labelName={"Lien de l'image de la cover *"} value={value.cover || ''} placeholder={"https://..."} onChange={onChange} disabled={isPending} />
                </div>

                <div className="flex justify-end pt-4 mt-2">
                    <ButtonSubmit isPending={isPending} text={"Valider et ajouter"}></ButtonSubmit>
                </div>
            </form>
        </div>
    )
}