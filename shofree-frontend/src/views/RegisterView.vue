<script setup lang="ts">
import type { ErrorResponse } from '@/interfaces/response'
import authService from '@/services/authService'
import type { AxiosError } from 'axios'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

async function register(event: Event) {
  event.preventDefault()

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  try {
    const response = await authService.register(username.value, password.value)

    console.log(response)

    if (response.data.statusCode === 201) {
      console.log(response.data.data)
      alert(response.data.data)
    } else {
      alert(response.data.message)
      return
    }
  } catch (error) {
    // cast error to ErrorResponse
    const axiosError = error as AxiosError<ErrorResponse>
    alert(axiosError.response?.data.message || 'Failed to register user')
  }
}
</script>

<template>
  <div class="register flex items-center justify-center min-h-screen">
    <form class="w-80 grid gap-2">
      <h2 class="text-center text-xl font-bold">Register</h2>
      <label for="username">Username</label>
      <input
        class="border-2 rounded"
        type="text"
        id="username"
        name="username"
        v-model="username"
        required
      />

      <label for="password">Password</label>
      <input
        class="border-2 rounded"
        type="password"
        id="password"
        name="password"
        v-model="password"
        required
      />

      <label for="confirm-password">Confirm Password</label>
      <input
        class="border-2 rounded"
        type="password"
        id="confirm-password"
        name="confirm-password"
        v-model="confirmPassword"
        required
      />
      <button type="submit" @click="register" class="bg-black rounded-md text-white p-1">
        Register
      </button>
      <p class="text-center">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </form>
  </div>
</template>
