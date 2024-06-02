export interface Response<T> {
  statusCode: number
  message: string
  data: T
}

export interface ErrorResponse {
  statusCode: number
  message: string
  // details is an object with dynamic keys and values so we use Record<string, any>
  details: Record<string, any>
  timestamp: string
  path: string
}
