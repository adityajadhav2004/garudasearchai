import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // Ensure API key is set securely
  if (!process.env.SERPER_API_KEY) {
    return NextResponse.json({
      organic: [
        {
          title: "Server misconfiguration: API key missing.",
          snippet: "Contact the administrator or try again later.",
          link: "#",
        },
      ],
    }, { status: 500 })
  }
  try {
    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 })
    }

    const response = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: query,
        num: 10,
      }),
    })

    if (!response.ok) {
      console.error("Serper API error:", response.status, response.statusText)
      throw new Error(`Serper API request failed: ${response.status}`)
    }

    const data = await response.json()

    // Ensure we have a valid response structure
    if (!data.organic) {
      data.organic = []
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Search error:", error)

    // Return a fallback response instead of an error
    return NextResponse.json(
      {
        organic: [
          {
            title: "Search temporarily unavailable",
            snippet: "We're experiencing technical difficulties with search. Please try again in a moment.",
            link: "#",
          },
        ],
      },
      { status: 200 },
    )
  }
}
