import { atom } from "nanostores";
import type { AdaptedCourse } from "~/env.d";
import { type FormData } from "./validations/mainSchema";

export const $course = atom<AdaptedCourse>({
  alreadyStarted: false,
  comingSoon: false,
  courseId: -1,
  courseRid: "",
  daysTilCourse: -1,
  estado: "",
  finalDateString: "",
  finishTime: "",
  isAsync: false,
  name: "",
  prices: [],
  slug: "",
  startTime: "",
  type: "",
  users: [],
});

export const $formStore = atom<FormData>({
  coupon: "",
  factura: false,
  payment: "1pago",
  paymentMethod: "mp",
});

export const $urlParams = atom<Record<string, any>>({
  area: -1,
  country: "",
  num: "",
  name: "",
  email: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_component: "",
});

export const $appliedDiscount = atom<number>(0.0);

export const $originalUrl = atom<string>("");
