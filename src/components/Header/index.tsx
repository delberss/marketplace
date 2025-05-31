import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import './index.css';
import type { AppDispatch } from '../../store';
import { logout } from '../../store/userSlice';
import { FaSearch, FaUserCog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { setSearchProduct } from '../../store/searchProductSlice';
import logo from '../../assets/images/newlogo.png';

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [inputSearch, setInputSearch] = useState<string>('');

    const handleLogout = () => {
        dispatch(logout());
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const clearSearch = () => dispatch(setSearchProduct(''));

    const handleCart = () => {
        navigate('/cart');
    }

    return (
        <header className="header-container">
            <div className="logo">
                <Link to="/" onClick={clearSearch}> 
                <img src={logo} />
                </Link>
            </div>

            <nav className="nav-menu">
                <ul>
                    <li><Link to="/" onClick={clearSearch}>Home</Link></li>
                    <li><Link to="/">Sobre nós</Link></li>
                    <li><Link to="/">Contato</Link></li>
                </ul>
            </nav >

            <div className="search-container">
                <input
                    type="text"
                    name={inputSearch}
                    id="search"
                    className="input-store"
                    placeholder="Buscar produtos..."
                    onChange={(e) => setInputSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            dispatch(setSearchProduct(inputSearch));
                        }
                    }}
                />
                <button
                    className="search-icon"
                    aria-label="Buscar"
                    onClick={() => dispatch(setSearchProduct(inputSearch))}
                >
                    <FaSearch />
                </button>
            </div>

            <div className="user-actions" ref={menuRef}>
                <button
                    className='cart-button'
                    onClick={handleCart}
                >
                    <FaCartShopping />
                </button>
                <button
                    className="settings-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Abrir menu"
                >
                    <FaUserCog />
                </button>

                {isMenuOpen && (
                    <div className="user-dropdown">
                        <button className="dropdown-option" onClick={handleLogout}>
                            Meus Dados
                        </button>
                        <button className="dropdown-option" onClick={handleLogout}>
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </header >
    );
};
