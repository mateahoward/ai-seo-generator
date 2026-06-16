# 🤖 AI SEO Asset Generator

A web application built with **Nuxt 4** and powered by Google’s **Gemini AI** engine. This application streamlines search engine optimization by transforming raw webpage metrics into perfectly formatted, high-CTR Google SERP snippets and logical URL slugs.

---

## 🧠 AI Model & Engine Integration

This project leverages the official **Google Gen AI SDK** to manage contextual processing pipelines securely.

- **Core Intelligence Engine:** `gemini-2.5-flash`
- **Deterministic Guardrails:** The application bypasses loose, unpredictable text string generation by enforcing Gemini **`responseSchema`** constraints on the server side. The AI is restricted to returning a verified JSON schema, ensuring flawless, zero-risk UI rendering on the client side.

---

## 📦 Core Dependencies

Beyond the native Nuxt application engine, this platform relies on the following key libraries:

### 🧩 Server Architecture

- **`@google/genai`** — The official Google Gen AI client library used to manage secure prompt contexts, isolate API environments, and enforce rigid structural output constraints.

### 🎨 Client Interface

- **`highlight.js`** — An industry-standard text and script tokenization parser used to dynamically apply syntax highlighting and themes to raw HTML tags on the fly.

---

## ⚙️ Configuration & Environment Setup

### 1. Install dependencies

Initialize your local package environment using your preferred package management node:

```bash
# Using npm
npm install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 2. Configure Local Environment Variables (.env)

```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Local Execution & Production Building

Development Execution
To spin up the local development engine—which runs both your client-side interface and local Node.js Nitro endpoints simultaneously—execute:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# bun
bun run dev
```
