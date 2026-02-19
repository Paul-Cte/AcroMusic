export default function Input({type,placeholder,isRequired,onChange,value,name,isPending,labelName,accept}) {
    return (
        <>
            <label htmlFor={name}>{labelName}</label>
            <input disabled={isPending} accept={accept} name={name} id={name} value={value} onChange={onChange} className={"border border-black p-[5px] rounded-lg w-full"} type={type} placeholder={placeholder} required={isRequired}/>
        </>
    )
}