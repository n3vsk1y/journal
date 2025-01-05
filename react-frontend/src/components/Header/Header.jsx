import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import { useUser } from '../../providers/UserContext'
import Loading from '../Loading/Loading'

const Header = () => {
    const navigate = useNavigate()
    const { user } = useUser()

    if (!user) {
        return <Loading />
    }

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
                <button className='header-button' onClick={() => navigate('/load')}>loading</button>
            </nav>
            <div className='user'>
                <button onClick={() => navigate('/profile')} className='header-button user-button'>{user.username}</button>
                <img 
                    src={user.avatar_url}
                    alt='mini_avatar'
                    className='header-avatar'
                    onClick={() => navigate('/profile')}
                />
                <div className="header-switch-wrapper">
                    <ThemeSwitch />
                </div>
                <button onClick={handleLogout} className='header-button user-button'>Выход</button>
            </div>
        </header>
    )
}

export default Header