<template>
  <div class="w-80">
    <h2 class="font-bold text-xl">Shopping Cart</h2>
    <div v-if="cartStore.items.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <p>{{ item.name }} - ${{ item.price }} x {{ item.quantity }}</p>
        <img :src="item.image" alt="item.name" />
        <button @click="removeFromCart(item.id)">Remove</button>
      </div>
      <div class="cart-summary">
        <p class="text-semibold">Total Items: {{ cartStore.totalItems }}</p>
        <p class="text-semibold">Total Price: ${{ cartStore.totalPrice }}</p>
        <div class="grid gap-2">
          <button @click="pay" class="w-full text-center bg-green-500 text-white">Pay</button>
          <button @click="clearCart" class="w-full text-center bg-red-500 text-white">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCartStore } from '@/stores/cart'
import transactionService from '@/services/transactionService'
import type { ErrorResponse } from '@/interfaces/response'
import type { AxiosError } from 'axios'
import { useProfileStore } from '@/stores/profile'

export default defineComponent({
  setup() {
    const cartStore = useCartStore()
    const profileStore = useProfileStore()

    const removeFromCart = (productId: number) => {
      cartStore.removeProduct(productId)
    }

    const clearCart = () => {
      cartStore.clearCart()
    }

    const pay = async () => {
      const amount = cartStore.totalPrice
      const note = cartStore.items
        .map((item) => `${item.name} - $${item.price} x ${item.quantity}`)
        .join(', ')

      try {
        const response = await transactionService.pay({ amount, note })

        if (response.data.statusCode === 201) {
          alert('Payment success')
          cartStore.clearCart()
          profileStore.fetchProfile()
        } else {
          alert(response.data.message)
          return
        }
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        alert(axiosError.response?.data.message || 'Failed to register user')
      }
    }

    return {
      cartStore,
      removeFromCart,
      clearCart,
      pay
    }
  }
})
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 4px;
}
.cart-item img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.cart-summary {
  margin-top: 20px;
}
</style>
