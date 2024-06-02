<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex items-center justify-between bg-[#333] text-white p-2">
      <nav class="flex space-x-2">
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/deposit">Deposit</router-link>
        <router-link to="/withdraw">Withdraw</router-link>
        <button v-if="profileStore.user" @click="logout">Logout</button>
      </nav>
      <div v-if="profileStore.user" class="flex items-center space-x-2">
        <p>Welcome, {{ profileStore.user.username }}</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/217/217853.png"
          alt="coin"
          class="w-4 h-4"
        />
        <p>${{ profileStore.user.wallet.balance }}</p>
      </div>
    </header>
    <main class="flex-1 p-4">
      <router-view />
    </main>
    <footer class="bg-[#333] text-white text-center p-1">
      <p>© 2024 My Vue App</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    var router = useRouter()
    const profileStore = useProfileStore()

    const logout = () => {
      profileStore.logout()
      router.push({
        name: 'login'
      })
    }

    onMounted(() => {
      profileStore.fetchProfile()
    })

    return {
      profileStore,
      logout
    }
  }
})
</script>
