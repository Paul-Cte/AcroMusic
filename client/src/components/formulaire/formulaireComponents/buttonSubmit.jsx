export default function ButtonSubmit({text,onSubmit,isPending}) {
    return(
        <button disabled={isPending} onSubmit={onSubmit} className={"bg-black text-white rounded-lg p-[7px] w-fit cursor-pointer"} type={"submit"}>{isPending ? "Connexion..." : text}</button>
    )
}