# GarudaSearchAI

GarudaSearchAI is a modern, quantum-inspired AI search interface built with Next.js, React, and Framer Motion. It leverages advanced AI APIs to deliver contextual, meaningful, and visually stunning search results.

## Features

- ✨ Quantum-inspired animated UI
- 🔍 AI-powered search with contextual understanding
- ⚡ Fast, responsive, and mobile-friendly
- 🎨 Beautiful glassmorphism and neon design
- 🔑 Secure API key management via environment variables
- 🧩 Modular, component-based architecture

## Demo

[Live Demo](https://your-deployment-link.com)

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/adityajadhav2004/garudasearchai.git
cd garudasearchai
```

### 2. Install dependencies

```sh
npm install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```
OPENROUTER_API_KEY=your_openrouter_api_key
SERPER_API_KEY=your_serper_api_key
```

### 4. Run the development server

```sh
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 5. Build for production

```sh
npm run build
npm start
```

## Deployment

You can deploy this app to platforms like Vercel or Netlify. Make sure to set the environment variables in your deployment dashboard.

## Project Structure

```
app/
  page.tsx           # Main page and layout
  globals.css        # Global styles
components/
  ...                # UI and feature components
lib/
  ...                # API and utility libraries
public/
  ...                # Static assets
```

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenRouter API](https://openrouter.ai/)
- [Serper API](https://serper.dev/)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---
