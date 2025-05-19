interface InputProps {
    type: string;
    placeholder: string;
}

const Input:React.FC<InputProps> = ({
    type,placeholder
}) => {
    return(
        <input type={type} placeholder={placeholder}/>
    )
}

export default Input;