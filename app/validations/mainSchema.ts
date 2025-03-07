import { z } from "zod";

export const mainSchema = z.object({
  coupon: z.string(),
  factura: z.boolean().optional(),
  paymentMethod: z.enum(["mp", "stripe"]).optional(),
  payment: z.enum(["1pago", "2pagos"]).default("1pago"),
});

export type FormData = z.infer<typeof mainSchema>;
