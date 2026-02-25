export abstract class AiService {
    abstract translateReview(content: string): Promise<{ en: string; fr: string }>
}