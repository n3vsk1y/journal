import React from 'react'
import { useNavigate } from 'react-router-dom'

import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import './Root.css'

const RootScreen = () => {
    const navigate = useNavigate()

    return (
        <>
            <div>
                <div className="logo-wrapper">
                    <h1 className="neon-button">Welcome Logo</h1>
                    <h1 className="neon-text">Welcome Logo</h1>
                </div>
                <div id="btns">
                    <button
                        className="root-button glow-button"
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </button>
                    <button
                        className="root-button glow-button"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="switch-wrapper">
                <ThemeSwitch />
            </div>
        </>
    )
}

export default RootScreen
