import React from "react";
interface InputFieldProps {
    id:string;
    htmlFor: string;
    name: string;
    type:string;
    placeholder: string;
    value ?: string;
    children: React.ReactNode;
}
const InputField:React.FC<InputFieldProps> = ({
    id,
    htmlFor,
    name,
    type,
    placeholder,
    value,
    children,
    ...props
}) => {
    return(
        <div className="flex flex-col mb-4 w-full">
            <label 
            htmlFor={htmlFor}
            className="mb-2 font-semibold text-lg">
                {children}
            </label>
            <input
                id = {id}
                type={type} 
                name={name}
                placeholder = {placeholder}
                value = {value}
                {...props}
                className="p-2 bg-gray-50 rounded-md ring-2 ring-gray-200 focus:outline-none focus:ring-red-600"
            />
        
        </div>
    )
}
export default InputField;