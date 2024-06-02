import type { AxiosResponse } from 'axios'
import http from './http'
import type { Response } from '@/interfaces/response'
import type { GetMeResponse, LoginResponse } from '@/interfaces/auth.interface'

const login = async (
  username: string,
  password: string
): Promise<AxiosResponse<Response<LoginResponse>>> => {
  const response = http.post('/auth/login', {
    username,
    password
  })
  return response
}

const register = async (
  username: string,
  password: string
): Promise<AxiosResponse<Response<string>>> => {
  const response = await http.post('/auth/register', {
    username,
    password
  })
  return response
}

const getMe = async (): Promise<AxiosResponse<Response<GetMeResponse>>> => {
  const response = await http.get('/auth/me')
  return response
}

const authService = {
  login,
  register,
  getMe
}

export default authService
