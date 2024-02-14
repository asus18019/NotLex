import { z } from 'zod';

export const NewWordSchema = z.object({
	word: z.string().min(2, "Word must contain at least 2 character(s)"),
	category: z.string().min(1, "Category must contain at least 1 character(s)"),
	meaning: z.string().min(4, "Meaning must contain at least 4 character(s)"),
	example: z.string().min(4, "Example must contain at least 4 character(s)")
});

export type NewWordSchemaType = z.infer<typeof NewWordSchema>;