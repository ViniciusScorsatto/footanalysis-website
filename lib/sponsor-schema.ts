import { z } from "zod";

export const sponsorInquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  company: z.string().trim().min(2).max(120),
  brand_or_product: z.string().trim().min(2).max(120),
  budget_or_scope: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(2000),
  locale: z.enum(["en", "pt"])
});

export type SponsorInquiryInput = z.infer<typeof sponsorInquirySchema>;
