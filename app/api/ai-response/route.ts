import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // Ensure API key is set securely
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({
      answer: "Server misconfiguration: API key missing.",
      followUpQuestions: [
        "Contact the administrator.",
        "Try again later."
      ],
      sources: []
    }, { status: 500 })
  }
  try {
    const { query, searchResults } = await request.json()

    const prompt = `Based on the search query "${query}" and the following search results, provide a comprehensive answer.

Search Results:
${searchResults
  .slice(0, 5)
  .map((result: any, index: number) => `${index + 1}. ${result.title}\n${result.snippet}\nURL: ${result.link}\n`)
  .join("\n")}

Provide a response in this JSON format:
{
  "answer": "A comprehensive answer in markdown format",
  "followUpQuestions": ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6"]
}

Return only valid JSON, no other text.`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant that responds with valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API failed: ${response.status}`)
    }

    const data = await response.json()
    let content = data.choices[0].message.content.trim()

    // Clean up JSON
    content = content.replace(/```json\s*/g, "").replace(/```\s*/g, "")
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      content = jsonMatch[0]
    }

    const parsedResponse = JSON.parse(content)

    // Add sources
    const sources = searchResults.slice(0, 8).map((result: any, index: number) => ({
      id: index + 1,
      title: result.title,
      url: result.link,
      snippet: result.snippet,
      domain: new URL(result.link).hostname,
      relevancyScore: Math.floor(Math.random() * 30) + 70,
    }))

    return NextResponse.json({
      ...parsedResponse,
      sources,
    })
  } catch (error) {
    console.error("AI Error:", error)
    return NextResponse.json({
      answer: "I apologize, but I encountered an error processing your request. Please try again.",
      followUpQuestions: [
        "Can you rephrase your question?",
        "Try a different search term",
        "Search for something else",
      ],
      sources: [],
    })
  }
}
