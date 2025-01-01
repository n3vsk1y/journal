import React from 'react'
import './ThemeSwitch.css'

const ThemeSwitch = () => {
    const setDarkTheme = () => {
        document.querySelector('body').setAttribute('theme-mode', 'dark')
    }

    const setLightTheme = () => {
        document.querySelector('body').setAttribute('theme-mode', 'light')
    }

    const toggleTheme = event => {
        if (event.target.checked) setLightTheme()
        else setDarkTheme()
    }


    return (
        <div class="wrapper">
            <input type="checkbox" id="hide-checkbox" onChange={toggleTheme} />
            <label for="hide-checkbox" class="toggle">
                <span class="toggle-button">
                    <span class="crater crater-1"></span>
                    <span class="crater crater-2"></span>
                    <span class="crater crater-3"></span>
                    <span class="crater crater-4"></span>
                    <span class="crater crater-5"></span>
                    <span class="crater crater-6"></span>
                    <span class="crater crater-7"></span>
                </span>
                <span class="star star-1"></span>
                <span class="star star-2"></span>
                <span class="star star-3"></span>
                <span class="star star-4"></span>
                <span class="star star-5"></span>
                <span class="star star-6"></span>
                <span class="star star-7"></span>
                <span class="star star-8"></span>
            </label>
        </div>
    )
}

export default ThemeSwitch
