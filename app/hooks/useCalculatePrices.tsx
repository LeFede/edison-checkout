import { useQueryClient } from "@tanstack/react-query";
import useRetrieveUrlData from "./useRetrieveUrlData";
import { type AdaptedCourse } from "~/env.d";
import formatPrice from "~/utils/formatPrice";
import { useStore } from "@nanostores/react";
import { $appliedDiscount } from "~/store";

const useCalculatePrices = () => {
  const params = useRetrieveUrlData();
  const queryClient = useQueryClient();
  const appliedDiscount = useStore($appliedDiscount);
  const { country } = params;
  const courseState = queryClient.getQueryData(["course"]) as AdaptedCourse;
  const cupos = 1;

  const currency =
    {
      Argentina: "ARS",
      Spain: "EUR",
    }[country] || "USD";

  const symbol =
    {
      Spain: "€",
    }[country] || "$";

  const price = courseState.prices.find((price) => price.currency == currency);
  const fullPrice = (price?.value || 0) * cupos;
  const finalPrice: any = fullPrice * (1 - appliedDiscount);
  const twoPayments = finalPrice / 2;

  const isArgentina = currency == "ARS";

  const fullPriceString = formatPrice(fullPrice, isArgentina);
  const finalPriceString = formatPrice(finalPrice, isArgentina);
  const twoPaymentsString = formatPrice(twoPayments, isArgentina);
  const twoPaymentsOriginalString = formatPrice(fullPrice / 2, isArgentina);

  return {
    fullPriceString,
    finalPriceString,
    twoPaymentsString,
    twoPaymentsOriginalString,
    symbol,
    cupos,
    currency,
    isArgentina,
  };
};
export default useCalculatePrices;
