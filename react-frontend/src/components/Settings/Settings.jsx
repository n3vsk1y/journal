import React, { useState } from 'react'
import './Settings.scss'

const Settings = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		apikey: '',
		apisecret: '',
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
        console.log('Ключи сохранены')

		// try {
		// 	const response = await fetch('/api/settings', {
		// 		method: 'POST',
		// 		headers: { 'Content-Type': 'application/json' },
		// 		body: JSON.stringify(formData),
		// 	})

		// 	if (response.ok) {
		// 		alert('Настройки сохранены!')
		// 		onClose()
		// 	} else {
		// 		const errorData = await response.json()
		// 		alert(`Ошибка: ${errorData.message}`)
		// 	}
		// } catch (error) {
		// 	console.error('Ошибка при сохранении настроек:', error)
		// 	alert('Ошибка соединения с сервером.')
		// }
	}

	if (!isOpen) return null

	return (
		<div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
			<div className="modal-content">
				<button className="close-button" onClick={onClose}>
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
					<button type="submit" className="glow-button">
						Сохранить
					</button>
				</form>
			</div>
		</div>
	)
}

export default Settings
