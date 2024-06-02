// stores/profile.ts
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/user.interface'
import type { Transaction } from '@/interfaces/transactions.interface'
import authService from '@/services/authService'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    user: null as User | null,
    transactions: null as Transaction[] | null,
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchProfile() {
      this.loading = true
      this.error = null

      try {
        const response = await authService.getMe()
        if (response.data.statusCode === 200) {
          this.user = response.data.data.users
          this.transactions = response.data.data.transactions
        } else {
          this.error = response.data.message
        }
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
    async logout() {
      localStorage.removeItem('accessToken')
    }
  }
})
