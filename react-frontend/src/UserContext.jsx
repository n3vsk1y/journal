import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const UserContext = createContext()

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('')

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
    }, [])

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    )
}
