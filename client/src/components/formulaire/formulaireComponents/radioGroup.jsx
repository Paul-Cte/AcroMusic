
export default function RadioGroup({text,name,options,value,onChange,isPending}){
    return (
        <div>
            <span>{text}</span>
            <div>
                {options.map((option) => (
                    <label key={option.value} >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={String(value) === option.value}
                            onChange={onChange}
                            disabled={isPending}
                        />
                        <span>{option.text}</span>
                    </label>
                ))}
            </div>
        </div>

    )
}