export default function Input({type,placeholder,isRequired,onChange,value,name,isPending,labelName,accept}) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor={name} className="text-sm font-medium text-gray-800">{labelName}</label>
            <input disabled={isPending} accept={accept} name={name} id={name} value={value} onChange={onChange} className="border border-gray-300 px-3 py-2 text-sm rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors w-full bg-white text-black disabled:bg-gray-100 disabled:text-gray-500" type={type} placeholder={placeholder} required={isRequired}/>
        </div>
    )
}