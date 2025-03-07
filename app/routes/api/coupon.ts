import { type LoaderFunction, type ActionFunction } from "react-router";

import api_prod from "~/axios";

//
export const loader: LoaderFunction = async () => {
  try {
    const { data } = await api_prod.get("/");
    return { ...data };
  } catch (err) {
    console.log(err);
    return { message: "error :c" };
  }
};

export const action: ActionFunction = async ({ request }) => {
  const body = (await request.json()) as { coupon: string };
  const percentage =
    {
      EDISON10: 0.1,
      EDISON20: 0.2,
      EDISON30: 0.3,
    }[body.coupon] || 0.0;

  return { percentage };
  try {
    const { data } = await api_prod.post("/");
    return { ...data };
  } catch (err) {
    console.log(err);
    return { message: "error :c" };
  }
};
