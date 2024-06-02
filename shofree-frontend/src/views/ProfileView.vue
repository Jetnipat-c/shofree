<script lang="ts">
import { defineComponent } from 'vue'
import TransactionBox from '@/components/TransactionBox.vue'
import { useProfileStore } from '@/stores/profile'

export default defineComponent({
  components: {
    TransactionBox
  },
  name: 'ProfileView',
  setup() {
    const profileStore = useProfileStore()

    return {
      profileStore
    }
  }
})
</script>

<template>
  <main>
    <h1 class="text-xl font-bold">Your Profile</h1>
    <div v-if="profileStore.loading">Loading...</div>
    <div v-if="profileStore.error">{{ profileStore.error }}</div>
    <div v-if="profileStore.user">
      <p>Username: {{ profileStore.user.username }}</p>
      <p>Wallet ID: {{ profileStore.user.wallet.walletId }}</p>
      <p>Balance: {{ profileStore.user.wallet.balance }}</p>
    </div>
    <TransactionBox :transactions="profileStore.transactions ?? []" />
  </main>
</template>

<style scoped></style>
