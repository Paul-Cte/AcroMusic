export default function Select({text,name,options,value,onChange,isPending}){
    return (
        <div>
            <label htmlFor={name}>{text}</label>
            <select
                id={name}
                name={name}
                onChange={onChange}
                disabled={isPending}
                value={value}
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