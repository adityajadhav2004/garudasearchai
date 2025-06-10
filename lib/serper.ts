import { deeseekSearch } from "./deeseek"

export interface SerperResult {
  title: string
  link: string
  snippet: string
  date?: string
}

export interface SerperResponse {
  organic: SerperResult[]
  answerBox?: {
    answer: string
    title: string
    link: string
  }
}

export async function searchWithSerper(query: string): Promise<SerperResponse> {
  try {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error("Search failed")
    }

    const data = await response.json()
    if (data.organic && data.organic.length > 0) {
      return data
    }
    // If no results, fallback to deeseek
    const deeseekResults = await deeseekSearch(query)
    return { organic: deeseekResults }
  } catch (error) {
    // Fallback: use deeseek webscraping
    const deeseekResults = await deeseekSearch(query)
    return { organic: deeseekResults }
  }
}
