
interface ButtonProps {
    children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children, onClick, type = 'button', className = ''
}) => {
    return (
        <button
            type={type}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;
