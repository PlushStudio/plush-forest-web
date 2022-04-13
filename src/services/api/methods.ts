import axios from 'axios'
import backend from './axios'
import { ApiSuccessResponse, ApiSuccessResponseSchema } from './schemas/ApiSuccessResponseSchema'
import { ApiError, ApiErrorSchema } from './types'

interface DataSchema<T> {
  parse: (value: unknown) => T
}

export const get = async <T>(url: string, schema: DataSchema<T>): Promise<T> => {
  try {
    const response = await backend.get(url)
    return schema.parse(response.data)
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      const apiError = ApiErrorSchema.parse(error.response.data)
      throw new ApiError(apiError.statusCode, apiError.message)
    }

    throw error
  }
}

export const post = async (url: string, payload?: any): Promise<ApiSuccessResponse> => {
  try {
    const response = await backend.post(url, payload)

    ApiSuccessResponseSchema.parse(response.data)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      const apiError = ApiErrorSchema.parse(error.response.data)
      throw new ApiError(apiError.statusCode, apiError.message)
    }

    throw error
  }
}
