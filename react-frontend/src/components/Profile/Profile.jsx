import React from 'react'
import Header from '../Header/Header'
import './Profile.css'
import { useUser } from '../../providers/UserContext'

const Profile = () => {
    const f_user = {
        avatarUrl:
            'https://avatars.mds.yandex.net/i?id=539fc1711db30f5c1ecf5c445dbdf2ff_sr-12814755-images-thumbs&n=13',
        username: 'example',
        email: 'user@example.com',
        bio: 'Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев.',
        bbio: 'Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев. Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев. Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев. Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев. Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев.',
    }

    const { user } = useUser()
    console.log(user)

    return (
        <div>
            <Header />
            <main className="profile-content">
                <div className="profile-container">
                    <div className="avatar">
                        <img src={f_user.avatarUrl} alt="Avatar" />
                    </div>
                    <div className="profile-info">
                        <p className="username">{user.username}</p>
                        <p className="email">{user.email}</p>
                        <p
                            className="bio"
                            style={{ color: user.bio ? 'white' : 'gray' }}
                        >
                            {user.bio || 'Напишите что-нибудь о себе...'}
                        </p>
                    </div>
                </div>
                <button className="settings glow-button">Настройки</button>
            </main>
        </div>
    )
}

export default Profile
