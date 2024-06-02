<template>
  <div>
    <h1 class="text-xl font-bold">Transactions</h1>
    <div class="overflow-auto max-h-90 hide-scrollbar">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th class="bg-gray-100 border-b border-gray-200 p-2 text-left">Transaction Date</th>
            <th class="bg-gray-100 border-b border-gray-200 p-2 text-left">Amount</th>
            <th class="bg-gray-100 border-b border-gray-200 p-2 text-left">Transaction Type</th>
            <th class="bg-gray-100 border-b border-gray-200 p-2 text-left">Before Balance</th>
            <th class="bg-gray-100 border-b border-gray-200 p-2 text-left">After Balance</th>
            <th class="bg-gray-100 border-b border-gray-200 p-2 text-left">Note</th>
            <th class="bg-gray-100 border-b border-gray-200 p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction.transactionDate"
            class="odd:bg-white even:bg-gray-50"
          >
            <td class="border-b border-gray-200 p-2">
              {{ formatDate(transaction.transactionDate) }}
            </td>
            <td class="border-b border-gray-200 p-2">{{ transaction.amount }}</td>
            <td class="border-b border-gray-200 p-2">{{ transaction.type }}</td>
            <td class="border-b border-gray-200 p-2">{{ transaction.beforeBalance }}</td>
            <td class="border-b border-gray-200 p-2">{{ transaction.afterBalance }}</td>
            <td class="border-b border-gray-200 p-2">{{ transaction.note }}</td>
            <td class="border-b border-gray-200 p-2">{{ transaction.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import type { Transaction } from '@/interfaces/transactions.interface'
import { defineComponent, ref, type PropType } from 'vue'
import { format } from 'date-fns'

export default defineComponent({
  name: 'TransactionBox',
  props: {
    transactions: {
      type: Array as PropType<Transaction[]>,
      required: true
    }
  },
  methods: {
    formatDate(dateString: string) {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss')
    }
  }
})
</script>

<style scoped>
/* table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
} */
/* You can include the custom class here if not added globally */
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Opera */
}

.hide-scrollbar {
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  scrollbar-width: none; /* For Firefox */
}
</style>
