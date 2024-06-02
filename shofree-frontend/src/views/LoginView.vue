<script setup lang="ts">
import type { ErrorResponse } from '@/interfaces/response'
import authService from '@/services/authService'
import type { AxiosError } from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

var router = useRouter()
const username = ref('')
const password = ref('')

async function login(event: Event) {
  event.preventDefault()

  try {
    const response = await authService.login(username.value, password.value)
    response.data.data.accessToken

    if (response.data.statusCode === 201) {
      localStorage.setItem('accessToken', response.data.data.accessToken)
      router.push({
        name: 'home'
      })
    } else {
      alert(response.data.message)
      return
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    alert(axiosError.response?.data.message || 'Failed to register user')
  }
}
</script>

<template>
  <div class="register flex items-center justify-center min-h-screen">
    <form class="w-80 grid gap-2">
      <h2 class="text-center text-xl font-bold">Login</h2>
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

      <button type="submit" @click="login" class="bg-black rounded-md text-white p-1">Login</button>
      <p class="text-center">
        Don't have an account? <router-link to="/register">Register</router-link>
      </p>
    </form>
  </div>
</template>
