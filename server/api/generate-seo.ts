import { GoogleGenAI, Type } from '@google/genai'

interface SeoFormInput {
  site: string
  pageTitle: string
  pageTone: 'formal' | 'informal'
  targetKeywords: string
  pageDescription: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiKey = config.geminiApiKey

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'API Key is missing.' })
  }

  const body = await readBody<SeoFormInput>(event)
  const ai = new GoogleGenAI({ apiKey })

  const prompt = `
    You are an expert SEO specialist. Generate an optimized Google Search Snippet based on these details:
    - Page Content Description: ${body.pageDescription}
    - Primary Target Keywords: ${body.targetKeywords}
    - Proposed Raw Title: ${body.pageTitle}
    - Tone of Voice: ${body.pageTone}
  `

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            metaTitle: {
              type: Type.STRING,
              description: 'An attractive, high-CTR SEO Meta Title max 60 chars.',
            },
            metaDescription: {
              type: Type.STRING,
              description:
                'An action-driven Meta Description max 155 chars incorporating keywords.',
            },
            metaKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'A list of 5-10 relevant keywords for the page.',
            },
            urlSlugs: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Exactly 3 relevant, hyphen-separated URL slug options.',
            },
          },
          required: ['metaTitle', 'metaDescription', 'metaKeywords', 'urlSlugs'],
        },
      },
    })

    const jsonOutput = JSON.parse(response.text || '{}')
    return { success: true, result: jsonOutput }
  } catch (error: any) {
    return createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Failed to communicate with Gemini.',
    })
  }
})
