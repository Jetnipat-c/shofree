import type { Transaction } from './transactions.interface'
import type { User } from './user.interface'

export interface LoginResponse {
  accessToken: string
}

export interface GetMeResponse {
  users: User
  transactions: Transaction[]
}
