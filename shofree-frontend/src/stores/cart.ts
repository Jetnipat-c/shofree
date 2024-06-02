// stores/cart.js
import type { CartItem, Product } from '@/interfaces/product.interface'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  actions: {
    addProduct(product: Product) {
      const existingProduct = this.items.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeProduct(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    clearCart() {
      this.items = []
    }
  },
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.quantity * item.price, 0)
  }
})
