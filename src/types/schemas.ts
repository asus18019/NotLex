import { z } from 'zod';

export const RegisterSchema = z
	.object({
		firstName: z.string().optional(),
		lastName: z.string().optional(),
		email: z.string().email("Invalid email address").min(3, "Email must contain at least 3 character(s)"),
		password: z.string().min(6, "Password must contain at least 6 character(s)"),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"]
	});


export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z
	.object({
		email: z.string().email("Invalid email address").min(3, "Email must contain at least 3 character(s)"),
		password: z.string().min(4, "Password must contain at least 4 character(s)")
	})
	.required();

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const NewWordSchema = z
	.object({
		word: z.string().min(2, "Word must contain at least 2 character(s)"),
		category: z.string().min(1, "Category must contain at least 1 character(s)"),
		meaning: z.string().min(4, "Meaning must contain at least 4 character(s)"),
		example: z.string().min(4, "Example must contain at least 4 character(s)")
	});

export type NewWordSchemaType = z.infer<typeof NewWordSchema>;