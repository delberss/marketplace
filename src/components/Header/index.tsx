import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import Button from '../Button';
import './index.css';
import type { AppDispatch } from '../../store';
import { logout } from '../../store/userSlice';
import { FaSearch, FaUserCog } from 'react-icons/fa';

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
                <a href="/">🛍️ DSStore</a>
            </div>

            <nav className="nav-menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Produtos</a></li>
                    <li><a href="/">Sobre nós</a></li>
                    <li><a href="/">Contato</a></li>
                </ul>
            </nav>

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
                    className="settings-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Abrir menu"
                >
                    <FaUserCog />
                </button>

                {isMenuOpen && (
                    <div className="user-dropdown">
                        <button className="dropdown-option" onClick={handleLogout}>
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};
