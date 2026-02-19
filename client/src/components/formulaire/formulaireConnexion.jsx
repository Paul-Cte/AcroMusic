
import Input from "./formulaireComponents/input.jsx";
import ButtonSubmit from "./formulaireComponents/buttonSubmit.jsx";

export default function FormulaireConnexion({value,onChange,onSubmit,isPending}) {
    return (

        <form onSubmit={onSubmit} className={"flex flex-col border border-black rounded-lg p-[20px] gap-3 items-center bg-white w-[95vw] max-w-[300px]"}>
            <Input isPending={isPending} name={"username"} value={value.username} onChange={onChange} type={"email"} placeholder={"John.doe@gmail.com"} isRequired={true}></Input>
            <Input isPending={isPending} name={"password"} value={value.password} onChange={onChange} type={"password"} placeholder={"••••••••"} isRequired={true}></Input>
            <ButtonSubmit isPending={isPending} text={"Se connecter"}></ButtonSubmit>
        </form>
    )
}