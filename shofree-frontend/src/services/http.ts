import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor to include the Authorization header
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') // Replace 'token' with your token key
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
