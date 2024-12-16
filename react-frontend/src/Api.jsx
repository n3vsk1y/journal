import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'http://127.0.0.1:8000/api',
	withCredentials: true,
})

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const { data } = await apiClient.post('/refresh')
				apiClient.defaults.headers.common[
					'Authorization'
				] = `Bearer ${data.access_token}`
				originalRequest.headers[
					'Authorization'
				] = `Bearer ${data.access_token}`

				return apiClient(originalRequest)
			} catch (refreshError) {
				console.error('Ошибка обновления токена:', refreshError)
				throw refreshError
			}
		}
		return Promise.reject(error)
	}
)

export async function login(username, password) {
	try {
		const response = await apiClient.post('/login', { username, password })
		apiClient.defaults.headers.common[
			'Authorization'
		] = `Bearer ${response.data.access_token}`
		return response.data
	} catch (error) {
		throw error.response.data
	}
}

export async function signup(email, username, password) {
	try {
		const response = await apiClient.post('/signup', {
			email,
			username,
			password,
		})
		apiClient.defaults.headers.common[
			'Authorization'
		] = `Bearer ${response.data.access_token}`
		return response.data
	} catch (error) {
		throw error.response.data
	}
}

export function logout() {
	delete apiClient.defaults.headers.common['Authorization']
}
