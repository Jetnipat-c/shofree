import type { AxiosResponse } from 'axios'
import http from './http'
import type { Response } from '@/interfaces/response'
import type { MakeTransaction, TransactionResponse } from '@/interfaces/transactions.interface'

const pay = async (
  body: MakeTransaction
): Promise<AxiosResponse<Response<TransactionResponse>>> => {
  const response = http.post('/transactions/payment', body)
  return response
}

const deposit = async (
  body: MakeTransaction
): Promise<AxiosResponse<Response<TransactionResponse>>> => {
  const response = http.post('/transactions/deposit', body)
  return response
}

const withdraw = async (
  body: MakeTransaction
): Promise<AxiosResponse<Response<TransactionResponse>>> => {
  const response = http.post('/transactions/withdraw', body)
  return response
}

const transactionService = {
  pay,
  deposit,
  withdraw
}

export default transactionService
