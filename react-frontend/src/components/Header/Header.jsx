import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
import alt_url from '../../assets/react.svg'

const Header = ({ username }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <header>
            <nav>
                <button className='header-button' onClick={() => navigate('/dashboard')}>Дашборд</button>
                <button className='header-button' onClick={() => navigate('/trades')}>Сделки</button>
                <button className='header-button' onClick={() => navigate('/resources')}>Полезные материалы</button>
            </nav>
            <div className='user'>
                <button onClick={() => navigate('/profile')} className='header-button user-button'>{username}</button>
                <img 
                    src={alt_url}
                    alt='User Avatar'
                    className='header-avatar'
                />
                <button onClick={handleLogout} className='header-button user-button'>Выход</button>
            </div>
        </header>
    )
}

export default Header