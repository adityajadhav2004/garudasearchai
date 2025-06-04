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

  return response.json()
}
