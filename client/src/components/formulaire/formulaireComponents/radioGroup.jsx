export default function RadioGroup({text,name,options,value,onChange,isPending}){
    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="text-sm font-medium text-gray-800">{text}</span>
            <div className="flex flex-row gap-6">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-black transition-colors">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={String(value) === option.value}
                            onChange={onChange}
                            disabled={isPending}
                            className="accent-black cursor-pointer w-4 h-4"
                        />
                        <span>{option.text}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}