import Input from "./formulaireComponents/input.jsx";
import ButtonSubmit from "./formulaireComponents/buttonSubmit.jsx";

export default function FormulaireConnexion({disabled,value,onChange,onSubmit,isPending}) {
    return (
        <form onSubmit={onSubmit} className="flex h-screen sm:h-auto flex-col border border-gray-200 rounded-lg p-8 gap-5 items-center bg-white w-full sm:max-w-sm shadow-sm">
            <div className="w-full text-center mb-2">
                <h1 className="text-2xl font-semibold tracking-tight text-black">Administration</h1>
                <p className="text-sm text-gray-500 mt-1">Connectez-vous à votre espace</p>
            </div>
            <Input isPending={isPending} name={"username"} labelName={"Adresse e-mail"} value={value.username} onChange={onChange} type={"email"} placeholder={"admin@exemple.com"} isRequired={true}></Input>
            <Input isPending={isPending} name={"password"} labelName={"Mot de passe"} value={value.password} onChange={onChange} type={"password"} placeholder={"••••••••"} isRequired={true}></Input>
            <div className="mt-2">
                <ButtonSubmit disabled={disabled} isPending={isPending} text={"Se connecter"}></ButtonSubmit>
            </div>
        </form>
    )
}