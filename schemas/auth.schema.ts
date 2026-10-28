import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must be at most 50 characters."),
    email: z.email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100, "Password must be at most 100 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterSchemaInput = z.input<typeof registerSchema>;
export type RegisterSchemaOutput = z.output<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginSchemaInput = z.input<typeof loginSchema>;
export type LoginSchemaOutput = z.output<typeof loginSchema>;