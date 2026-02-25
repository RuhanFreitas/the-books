import z from "zod"

export const translationSchema = z.object({
    en: z.string().min(1),
    fr: z.string().min(1)
})