export default function Select({text,name,options,value,onChange,isPending}){
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor={name} className="text-sm font-medium text-gray-800">{text}</label>
            <select
                id={name}
                name={name}
                onChange={onChange}
                disabled={isPending}
                value={value}
                className="border border-gray-300 px-3 py-2 text-sm rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors w-full bg-white text-black disabled:bg-gray-100 disabled:text-gray-500 cursor-pointer"
            >
                <option value={0} disabled>-- Choisir un compositeur --</option>
                {options?.map((compositeur) => (
                    <option key={compositeur.id} value={compositeur.id}>
                        {compositeur.nom}
                    </option>
                ))}
            </select>
        </div>
    )
}