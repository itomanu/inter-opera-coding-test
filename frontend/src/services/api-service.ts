import { API_BASE_URL } from '@/lib/constants'
import { SalesRep } from './types'

export const sendQuestion = async (question: string): Promise<string> => {
  const res = await fetch(`${API_BASE_URL}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: question
    })
  })

  if (!res.ok) throw new Error("Failed to get response from API")

  const data = await res.json()
  return data.answer
}

export const fetchSales = async (): Promise<SalesRep[]> => {
  const res = await fetch(`${API_BASE_URL}/sales`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (!res.ok) throw new Error("Failed to get response from API")

  const data = await res.json()
  return data.salesReps
}

export const fetchDealsMetric = async (): Promise<SalesRep[]> => {
  const res = await fetch(`${API_BASE_URL}/sales`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (!res.ok) throw new Error("Failed to get response from API")

  const data = await res.json()
  return data.salesReps
}
