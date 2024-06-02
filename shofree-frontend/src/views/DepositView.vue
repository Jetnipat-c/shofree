<template>
  <div class="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-bold mb-4">Deposit</h2>
    <form @submit.prevent="handleDeposit">
      <div class="mb-4">
        <label for="amount" class="block text-gray-700 text-sm font-bold mb-2">Amount</label>
        <input
          type="number"
          id="amount"
          v-model="amount"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter deposit amount"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Deposit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import transactionService from '@/services/transactionService'
import { useProfileStore } from '@/stores/profile'
import type { ErrorResponse } from '@/interfaces/response'
import type { AxiosError } from 'axios'

export default defineComponent({
  name: 'DepositView',
  setup() {
    const profileStore = useProfileStore()
    const amount = ref<number | null>(null)

    const handleDeposit = async () => {
      if (amount.value !== null && amount.value > 0) {
        try {
          const response = await transactionService.deposit({
            amount: amount.value,
            note: 'Deposit'
          })

          if (response.data.statusCode === 201) {
            alert('Deposit success')
            profileStore.fetchProfile()
          } else {
            alert(response.data.message)
            return
          }
        } catch (error) {
          const axiosError = error as AxiosError<ErrorResponse>
          alert(axiosError.response?.data.message || 'Failed to deposit')
        } finally {
          amount.value = null
        }
      }
    }

    return {
      amount,
      handleDeposit
    }
  }
})
</script>
