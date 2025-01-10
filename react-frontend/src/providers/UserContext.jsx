import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const token = localStorage.getItem('access_token')

		if (token) {
			try {
				const decoded = jwtDecode(token)
                updateUser(decoded?.data)
			} catch (error) {
				console.error('Ошибка при декодировании токена:', error)
				localStorage.removeItem('access_token')
			}
		} else {
			const savedUserData = localStorage.getItem('user')
			if (savedUserData) {
				setUser(JSON.parse(savedUserData))
			}
		}
	}, [])

	const updateUser = (newData) => {
		setUser((prevUser) => {
			const updatedUser = { ...prevUser, ...newData }

			localStorage.setItem('user', JSON.stringify(updatedUser))

			return updatedUser
		})
	}

	return (
		<UserContext.Provider value={{ user, updateUser }}>
			{children}
		</UserContext.Provider>
	)
}
