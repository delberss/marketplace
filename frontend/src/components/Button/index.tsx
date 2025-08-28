
interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    children, onClick, type = 'button', className = '', style
}) => {
    return (
        <button
            type={type}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            onClick={onClick}
            style={style}>
            {children}
        </button>
    )
}

export default Button;
