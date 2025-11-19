import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant ?: 'primary' | 'secondary' |'success' ;
    size ?: 'sm' | 'md' |'lg';
    children: React.ReactNode;
}

const Button : React.FC<ButtonProps> = ({
    children,
    variant = 'primary' ,
    size = 'md' , 
    className , 
    disabled , 
    ...props

}) => {
    const baseStyles: string =  `
    font-semibold rounded-lg focus:outline-none
    focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75
    transition-all duration-150 ease-in-out
    border
    disabled:opacity-60 disabled:cursor-not-allowed
    `;

    let variantStyles: string = '';
    switch (variant) {
        case 'primary' : 
            variantStyles = `
            bg-red-600 text-white
            hover:bg-red-700 
            focus:ring-red-500
            disabled:hover:bg-red-600
            `;
            break;
        case 'secondary' :
            variantStyles = `
            bg-white text-red-600 
            ring-2 ring-red-600 shadow-lg
            hover:bg-red-600 hover:text-white   
            `;
            break;
        case 'success' :
            variantStyles = `
            bg-green-500 text-white
            ring-2 ring-red-600 shadow-lg
             hover:bg-green-700

            `;
            break;
        default: 
            variantStyles = `
            text-white
            hover:bg-red-700 
            focus:ring-red-500
            disabled:hover:bg-red-600
            `;

    }
    let sizeStyles: string = '';
    switch (size) {
        case 'sm':
            sizeStyles = `px-3 py-1.5 text-sm`;
            break;
        case 'md':
            sizeStyles = `px-4 py-2 text-base`;
            break;
        case 'lg':
            sizeStyles = `px-10 py-2 text-lg`;
            break;
        default:
            sizeStyles = 'px-4 py-2 text-base';
    }
    const combinedClassName: string = `
        ${baseStyles}
        ${variantStyles}
        ${sizeStyles}
        ${className || ''}  
        `.replace(/\s+/g,' ').trim(); 
        //${className || ''} เอา className จาก props ภายนอกมาต่อ ถ้าไม่มี('')ก็จะเป็นstringว่างมาต่อแทน
        //.replace(/\s+/g,' ').trim(); รวม space หรือ การขึ้นบรรทัดใหม่แทนที่ด้วยspaceเดียว .trim คือลบspace หน้าหลัง
    return (
        <button type="button" className= {combinedClassName} disabled = {disabled} {...props}>{children}</button>
    )

}

export default Button;
