import React from 'react';
import Header from '../Header/Header';
import './Profile.css';

const Profile = () => {
    const user = {
        avatarUrl:
            'https://avatars.mds.yandex.net/i?id=539fc1711db30f5c1ecf5c445dbdf2ff_sr-12814755-images-thumbs&n=13',
        username: 'n3vsk1y',
        email: 'user@example.com',
        bio: 'Начинающий крипто-трейдер из России, мечтает заработать дахуя бабла и попасть в топ самых богатых бауманцев.',
    }

    return (
        <div>
            <Header />
            <main className="profile-content">
                <div className="profile-container">
                    <div className="avatar">
                        <img src={user.avatarUrl} alt="Avatar" />
                    </div>
                    <div className="profile-info">
                        <p className="username">{user.username}</p>
                        <p className="email">{user.email}</p>
                        <p className="bio">{user.bio}</p>
                    </div>
                </div>
                <button className="settings">Настройки</button>
            </main>
        </div>
    );
};

export default Profile;
