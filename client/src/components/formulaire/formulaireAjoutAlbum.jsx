import ButtonSubmit from "./formulaireComponents/buttonSubmit.jsx";
import Input from "./formulaireComponents/input.jsx";
import RadioGroup from "./formulaireComponents/radioGroup.jsx";
import Select from "./formulaireComponents/select.jsx";


export default function FormulaireAjoutAlbum({value,onChange,onSubmit,isPending,options,compositeurs}){

    return  (
        <form onSubmit={onSubmit}>
            <RadioGroup text={"Type de sortie"} name={"isSingle"} value={value.isSingle} onChange={onChange} isPending={isPending} options={options}  ></RadioGroup>
            <Input name={"nomAlbum"} labelName={"Titre"} value={value.nomAlbum} onChange={onChange} placeholder={"L'enfant de la pluie"} isRequired={true}></Input>
            <Input isPending={isPending} name={"description"} labelName={"Description *"} value={value.description} onChange={onChange} placeholder={"Cet album est trop cool ..."}></Input>
            <Input isPending={isPending} name={"nombreDeTitres"} labelName={"Nombre de titre"} value={value.nombreDeTitres} onChange={onChange} type={"number"} isRequired={true}></Input>
            <Input isPending={isPending} name={"dateDeSortie"} labelName={"Date de sortie"} value={value.dateDeSortie} type={"date"} onChange={onChange} isRequired={true}></Input>
            <Input isPending={isPending} type={"url"} name={"lienSpotify"} labelName={"Lien spotify"} value={value.lienSpotify} onChange={onChange} isRequired={true} placeholder="https://open.spotify..."></Input>
            <Input isPending={isPending} type={"url"} name={"lienDeezer"} labelName={"Lien Deezer"} value={value.lienDeezer} onChange={onChange} placeholder="https://www.deezer.com/..."/>
            <Input isPending={isPending} type={"url"} name={"lienYoutubeMusic"} labelName={"Lien YouTube Music"} value={value.lienYoutubeMusic} onChange={onChange} placeholder="https://music.youtube.com/..."/>
            <Input isPending={isPending} type={"url"} name={"lienAppleMusic"} labelName={"Lien Apple Music"} value={value.lienAppleMusic} onChange={onChange} placeholder="https://music.apple.com/..."/>
            <Select text={"Choisir le compositeur"} name={"idCompositeur"} isPending={isPending} value={value.idCompositeur} onChange={onChange} options={compositeurs}></Select>
            <Input isPending={isPending} type={"url"} name={"cover"} labelName={"Lien de l'image de la cover"} value={value.cover || ''} placeholder={"https://drive.google.com/..."}  onChange={onChange} disabled={isPending} />
            <ButtonSubmit isPending={isPending} text={"Valider"}></ButtonSubmit>
        </form>
    )
}