import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import Loading from '../components/Loading/Loading';

const UserContext = createContext()

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUser(decoded.data)
            } catch (error) {
                console.error('Ошибка при декодировании токена:', error)
            }
        }
        setLoading(false)
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}
