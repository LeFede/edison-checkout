import { type LoaderFunction, type ActionFunction } from "react-router";

import api_prod from "../../../axios";

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
  const body = await request.json();
  return { message: "Posteado (?)" };
  try {
    const { data } = await api_prod.post("/");
    return { ...data };
  } catch (err) {
    console.log(err);
    return { message: "error :c" };
  }
};
