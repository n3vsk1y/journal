import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootScreen from './components/RootScreen/Root'
import LogInScreen from './components/LogInScreen/LogIn'
import SignUpScreen from './components/SignUpScreen/SignUp'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<RootScreen />} />
				<Route path="/login" element={<LogInScreen />} />
				<Route path="/signup" element={<SignUpScreen />} />
			</Routes>
		</Router>
	)
}

export default App
