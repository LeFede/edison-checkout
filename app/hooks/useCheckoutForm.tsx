import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { mainSchema, type FormData } from "~/validations/mainSchema";
import { useStore } from "@nanostores/react";
import { $appliedDiscount, $formStore } from "~/store";
import { useEffect } from "react";

const useCheckoutForm = () => {
  const appliedDiscount = useStore($appliedDiscount);
  const formHook = useForm<FormData>({
    resolver: zodResolver(mainSchema),
    defaultValues: {
      ...$formStore.get(),
    },
  });

  const { watch } = formHook;

  useEffect(() => {
    const subscription = watch((values) => {
      // @ts-ignore
      return $formStore.set(values);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleCoupon = async () => {
    try {
      const coupon = watch("coupon");
      const res = await fetch("/api/coupon", {
        method: "POST",
        body: JSON.stringify({
          coupon,
        }),
      });
      const data = await res.json();
      if (data?.percentage)
        toast.success(`Descuento de ${data?.percentage * 100}% aplicado!`);
      $appliedDiscount.set(data?.percentage || 0.0);
    } catch (err) {}
  };

  return { ...formHook, appliedDiscount, handleCoupon };
};

export default useCheckoutForm;
