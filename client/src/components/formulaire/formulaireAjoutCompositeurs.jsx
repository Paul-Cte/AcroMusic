import Input from "./formulaireComponents/input.jsx";
import ButtonSubmit from "./formulaireComponents/buttonSubmit.jsx";

export default function FormulaireAjoutCompositeurs({onChange,value,onSubmit,isPending}){
    return (
        <div className="w-full max-w-4xl">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-black tracking-tight">Ajouter un compositeur</h2>
            </div>
            <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-t-lg p-6 shadow-sm flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-1">
                    <Input isPending={isPending} labelName={"Nom / Pseudo du compositeur"} name={"nom"} onChange={onChange} value={value} isRequired={true} placeholder={"Ex: Hans Zimmer"}></Input>
                </div>
                <ButtonSubmit isPending={isPending} text={"Ajouter"}></ButtonSubmit>
            </form>
        </div>
    )
}