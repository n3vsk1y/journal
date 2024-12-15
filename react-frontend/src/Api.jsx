import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
  });

export async function login(username, password) {
	try {
		const response = await axios.post(`${API_BASE_URL}/login`, {
			username,
			password,
		})
		return response
	} catch (error) {
		throw error.response.data
	}
}

export async function signup(email, username, password) {
	try {
		const response = await axios.post(`${API_BASE_URL}/signup`, {
			email,
			username,
			password,
		})
		return response.data
	} catch (error) {
		throw error.response.data
	}
}
