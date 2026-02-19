import Input from "./formulaireComponents/input.jsx";
import ButtonSubmit from "./formulaireComponents/buttonSubmit.jsx";

export default function FormulaireAjoutCompositeurs({onChange,value,onSubmit,isPending}){
    return (
        <form onSubmit={onSubmit}>
            <Input isPending={isPending} labelName={"Nom/pseudo du compositeur"} name={"nom"} onChange={onChange} value={value} isRequired={true}></Input>
            <ButtonSubmit isPending={isPending} text={"Ajouter le compositeur"}></ButtonSubmit>
        </form>
    )
}