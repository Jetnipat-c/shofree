export interface Transaction {
  depositId?: string
  walletId: string
  transactionDate: string
  amount: string
  beforeBalance: string
  afterBalance: string
  note: string
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  withdrawId?: string
  paymentId?: string
  type: 'deposit' | 'withdraw' | 'payment'
}

export interface MakeTransaction {
  amount: number
  note: string
}

export interface TransactionResponse {
  beforeBalance: number
  afterBalance: number
}
