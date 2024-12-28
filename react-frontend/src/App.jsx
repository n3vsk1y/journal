import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import RootScreen from './components/RootScreen/Root'
import LogInScreen from './components/LogInScreen/LogIn'
import SignUpScreen from './components/SignUpScreen/SignUp'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
    const isAuthenticated = !!localStorage.getItem('access_token');

	return (
		<Router>
			<Routes>
				<Route path="/" element={<RootScreen />} />
				<Route path="/login" element={<LogInScreen />} />
				<Route path="/signup" element={<SignUpScreen />} />
				<Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

			</Routes>
		</Router>
	)
}

export default App
