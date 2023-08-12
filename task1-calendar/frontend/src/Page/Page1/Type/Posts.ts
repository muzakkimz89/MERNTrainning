import { z } from "zod";

export const postSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
});

export const currencySchema = z.object({
    no: z.any(),
    country: z.string(),
    value: z.any(),
    id: z.number(),
});

export type PostType = z.infer<typeof postSchema>;
export type CurrencyType = z.infer<typeof currencySchema>;
