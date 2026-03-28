export default function ButtonSubmit({disabled,text,onSubmit,isPending}) {
    return(
        <button disabled={disabled} onSubmit={onSubmit} className="bg-black text-white text-sm font-medium rounded-md px-5 py-2.5 w-fit cursor-pointer hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm" type={"submit"}>{isPending ? "Traitement..." : text}</button>
    )
}