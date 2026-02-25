import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { AiService } from '../ai.service';
import { translationSchema } from '../schemas/translation.schema';

@Injectable()
export class GeminiService implements AiService {
    private readonly genAI: GoogleGenAI

    constructor() {
      this.genAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_KEY
      })
    }
  
    async translateReview(content: string): Promise<{ en: string; fr: string }> {

        const prompt = `
        You are a professional translator.

        Translate ONLY the textual content to English and French.

        IMPORTANT RULES:
        - DO NOT modify, remove, translate, or reorder any HTML tags.
        - DO NOT change attributes.
        - Preserve the exact HTML structure.
        - Only translate visible text between the tags.

        Return ONLY valid JSON in this format:
        {
        "en": "...",
        "fr": "..."
        }

        Content:
        ${content}
        `

        const response = await this.genAI.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseJsonSchema: translationSchema.toJSONSchema()
            }
        })

        if (!response.text) {
            throw new ServiceUnavailableException('Translation service temporarily unavailable')
        }

        const translation = translationSchema.parse(JSON.parse(response.text))

        return translation
    }
}
