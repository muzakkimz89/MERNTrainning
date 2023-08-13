import { z } from "zod";

export const currencySchema = z.object({
    no: z.any(),
    country: z.string(),
    value: z.any(),
    id: z.number(),
});

export type CurrencyType = z.infer<typeof currencySchema>;
