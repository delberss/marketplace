import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import './index.css';
import type { AppDispatch } from '../../store';
import { logout } from '../../store/userSlice';
import { FaSearch, FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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

    return (
        <header className="header-container">
            <div className="logo">
                <Link to="/"> 🛍️ DSStore</Link>
            </div>

            <nav className="nav-menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Sobre nós</Link></li>
                    <li><Link to="/">Contato</Link></li>
                </ul>
            </nav >

            <div className="search-container">
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="input-store"
                    placeholder="Buscar produtos..."
                />
                <button className="search-icon" aria-label="Buscar">
                    <FaSearch />
                </button>
            </div>

            <div className="user-actions" ref={menuRef}>
                <button
                    className='cart-button'
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
