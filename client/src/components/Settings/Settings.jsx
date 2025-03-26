import React, { useState } from 'react'
import { delApiKeys, setApiKeys } from '../../Api'
import './Settings.scss'

const Settings = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		apikey: '',
		apisecret: '',
	})
    const [key_error, setError] = useState('')

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await setApiKeys(
				formData.apikey,
				formData.apisecret
			)
			if (response.data.message === 'success') {
                setError('')
				onClose()
			} else if (response.data.message === 'Keys already exist') {
                setError('Ключи уже существуют')
			} else {
                setError(response.data.message || 'Unknown error occurred')
            }
		} catch (error) {
			console.error('Ошибка при сохранении ключей:', error)
		}
	}

    const handleDeleteKeys = async (e) => {
        e.preventDefault()

        try {
			const response = await delApiKeys()
			if (response.data.message === 'success') {
                setError('')
				onClose()
			} else if (response.data.message === 'keys not found') {
                setError('Ключи не найдены')
			} else {
                setError(response.data.message || 'Unknown error occurred')
            }
		} catch (error) {
			console.error('Ошибка при сохранении ключей:', error)
		}
    }

    const handleClose = (e) => {
        e.preventDefault()
        setError('')
        onClose()
    }

	if (!isOpen) return null

	return (
		<div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
			<div className="modal-content">
				<button className="close-button" onClick={handleClose}>
					&times;
				</button>
				<h2>Настройки</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="setting1">Api Key:</label>
						<input
							type="text"
							id="apikey"
							name="apikey"
							value={formData.setting1}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="apisecret">Api Secret:</label>
						<input
							type="text"
							id="apisecret"
							name="apisecret"
							value={formData.setting2}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="input-wrapper">
						<span>{key_error}</span>
					</div>
					<button type="submit" className="glow-button setting-submit-button">
						Сохранить
					</button>
					<button type="button" className="glow-button setting-del-button" onClick={handleDeleteKeys}>
						Удалить ключи
					</button>
				</form>
			</div>
		</div>
	)
}

export default Settings
