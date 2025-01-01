import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
import alt_url from '../../assets/react.svg'
import { useUser } from '../../providers/UserContext'

const Header = () => {
    const navigate = useNavigate()
    const { user } = useUser()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/')
    }

    return (
        <header>
            <nav>
                <button className='header-button' onClick={() => navigate('/dashboard')}>Дашборд</button>
                <button className='header-button' onClick={() => navigate('/trades')}>Сделки</button>
                <button className='header-button' onClick={() => navigate('/resources')}>Полезные материалы</button>
            </nav>
            <div className='user'>
                <button onClick={() => navigate('/profile')} className='header-button user-button'>{user.username}</button>
                <img 
                    src={alt_url}
                    alt='User Avatar'
                    className='header-avatar'
                    onClick={() => navigate('/profile')}
                />
                <button onClick={handleLogout} className='header-button user-button'>Выход</button>
            </div>
        </header>
    )
}

export default Header