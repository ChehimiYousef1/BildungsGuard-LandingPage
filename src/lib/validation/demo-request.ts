import { z } from "zod";

/** Shared by the client form today and by the API route later. */
export const demoRequestSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen an."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  date: z.string().min(1, "Bitte wählen Sie einen Wunschtermin."),
  time: z.string().min(1, "Bitte wählen Sie eine Uhrzeit."),
  programs: z.enum(["1-2", "3-5", "6-10", "10+"]).optional(),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;
