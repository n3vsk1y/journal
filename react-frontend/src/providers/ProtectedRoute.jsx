import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem('access_token')

	if (!token) {
		console.log('%c' + 'INVALID ACCESS\nPLEASE LOGIN', 'color: red')
		return <Navigate to="/login" />
	}
	return children
}

export default ProtectedRoute
