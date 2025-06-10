// deeseek.ts
// Simple web scraping utility using fetch and cheerio for Node.js/Next.js
import * as cheerio from 'cheerio';

export interface DeeseekResult {
  title: string;
  snippet: string;
  link: string;
}

export async function deeseekSearch(query: string): Promise<DeeseekResult[]> {
  // For demo: scrape DuckDuckGo (or another public search engine)
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const $ = cheerio.load(html);
  const results: DeeseekResult[] = [];
  $(".result__body").each((_, el) => {
    const title = $(el).find('.result__title').text().trim();
    const link = $(el).find('.result__url').attr('href') || '';
    const snippet = $(el).find('.result__snippet').text().trim();
    if (title && link) {
      results.push({ title, snippet, link });
    }
  });
  return results.length ? results : [{ title: 'No results found', snippet: '', link: '' }];
}
