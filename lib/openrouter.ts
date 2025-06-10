export interface Source {
  id: number
  title: string
  url: string
  snippet: string
  date?: string | null
  relevancyScore?: number
  domain: string
}

export interface AIResponse {
  answer: string
  followUpQuestions: string[]
  sources: Source[]
}

export async function generateAIResponse(query: string, searchResults: any[]): Promise<AIResponse> {
  try {
    const response = await fetch("/api/ai-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, searchResults }),
    })

    if (!response.ok) {
      throw new Error(`AI response failed: ${response.status}`)
    }

    const data = await response.json()

    // Ensure we have the required properties
    return {
      answer: data.answer || "No answer available",
      followUpQuestions: Array.isArray(data.followUpQuestions) ? data.followUpQuestions : [],
      sources: Array.isArray(data.sources) ? data.sources : [],
    }
  } catch (error) {
    // Fallback response if API fails
    return {
      answer: `Sorry, the AI engine is temporarily unavailable. Please try again later or rephrase your query about \"${query}\".`,
      followUpQuestions: [
        "Can you rephrase your question?",
        "Try a different search term",
        "Search for something else",
      ],
      sources: [],
    }
  }
}
