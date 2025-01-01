import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import RootScreen from './components/RootScreen/Root'
import LogInScreen from './components/LogInScreen/LogIn'
import SignUpScreen from './components/SignUpScreen/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Trades from './components/Trades/Trades'
import Resources from './components/Resources/Resources'
import Profile from './components/Profile/Profile'

import { UserProvider } from './providers/UserContext'
import ProtectedRoute from './providers/ProtectedRoute'

function App() {
    return (
        <HelmetProvider>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Helmet>
                                        <title>Добро пожаловать</title>
                                    </Helmet>
                                    <RootScreen />
                                </>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                    <Helmet>
                                        <title>Вход</title>
                                    </Helmet>
                                    <LogInScreen />
                                </>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <>
                                    <Helmet>
                                        <title>Регистрация</title>
                                    </Helmet>
                                    <SignUpScreen />
                                </>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Helmet>
                                        <title>Дашборд</title>
                                    </Helmet>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/trades"
                            element={
                                <ProtectedRoute>
                                    <Helmet>
                                        <title>Сделки</title>
                                    </Helmet>
                                    <Trades />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/resources"
                            element={
                                <ProtectedRoute>
                                    <Helmet>
                                        <title>Полезные материалы</title>
                                    </Helmet>
                                    <Resources />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Helmet>
                                        <title>Профиль</title>
                                    </Helmet>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
            </UserProvider>
        </HelmetProvider>
    )
}

export default App
