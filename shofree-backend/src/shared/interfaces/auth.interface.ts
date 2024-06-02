export interface RegisterResponse {
  username: string;
  wallet: Wallet;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface Wallet {
  walletId: string;
  balance: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface LoginResponse {
  accessToken: string;
}

export interface GetUserResponse {
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  wallet: {
    walletId: string;
    balance: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}
