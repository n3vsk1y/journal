import React from 'react'
import './ThemeSwitch.css'

const ThemeSwitch = () => {
    const setDarkTheme = () => {
        document.querySelector('body').setAttribute('theme-mode', 'dark')
        localStorage.setItem('selectedTheme', 'dark')
    }

    const setLightTheme = () => {
        document.querySelector('body').setAttribute('theme-mode', 'light')
        localStorage.setItem('selectedTheme', 'light')
    }

    const selectedTheme = localStorage.getItem('selectedTheme')

    if (selectedTheme === 'light') {
        setLightTheme()
    }

    const toggleTheme = (event) => {
        if (event.target.checked) setLightTheme()
        else setDarkTheme()
    }

    return (
        <>
            <input
                type="checkbox"
                id="hide-checkbox"
                onChange={toggleTheme}
                defaultChecked={selectedTheme === 'light'}
            />
            <label htmlFor="hide-checkbox" className="toggle">
                <span className="toggle-button">
                    <span className="crater crater-1"></span>
                    <span className="crater crater-2"></span>
                    <span className="crater crater-3"></span>
                    <span className="crater crater-4"></span>
                    <span className="crater crater-5"></span>
                    <span className="crater crater-6"></span>
                    <span className="crater crater-7"></span>
                </span>
                <span className="star star-1"></span>
                <span className="star star-2"></span>
                <span className="star star-3"></span>
                <span className="star star-4"></span>
                <span className="star star-5"></span>
                <span className="star star-6"></span>
                <span className="star star-7"></span>
                <span className="star star-8"></span>
            </label>
        </>
    )
}

export default ThemeSwitch
