import { z } from "zod";

export const mainSchema = z.object({
  coupon: z.string(),
  factura: z.boolean().optional(),
  paymentMethod: z.enum(["mp", "stripe", "none"]).optional().default("none"),
  payment: z.enum(["1pago", "2pagos"]),
});

export type FormData = z.infer<typeof mainSchema>;
