import type { Wallet } from './wallet.interface'

export interface User {
  userId: string
  username: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  wallet: Wallet
}
