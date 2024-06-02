<script lang="ts">
import { defineComponent } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/interfaces/product.interface'
import { products } from '@/constants/product'
import CartBox from '@/components/CartBox.vue'

export default defineComponent({
  components: {
    CartBox
  },
  setup() {
    const cartStore = useCartStore()

    const addToCart = (product: Product) => {
      cartStore.addProduct(product)
    }

    return {
      products,
      cartStore,
      addToCart
    }
  }
})
</script>

<template>
  <div class="flex space-x-3">
    <div class="w-full">
      <div class="grid grid-cols-3 gap-2">
        <div v-for="product in products" :key="product.id" class="mx-auto flex flex-col space-y-2">
          <img :src="product.image" alt="product.name" class="w-[300px] h-[200px] object-cover" />
          <div class="flex items-center justify-between">
            <p class="font-bold">{{ product.name }}</p>
            <p class="font-bold">${{ product.price }}</p>
          </div>
          <button @click="addToCart(product)" class="w-full text-center bg-black text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <CartBox />
  </div>
</template>
