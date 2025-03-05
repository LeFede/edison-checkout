import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("process/:id", "routes/process.tsx"),
  route("payment", "routes/payment.tsx"),
  route("api/createLead", "routes/api/createLead.ts"),
  route("api/coupon", "routes/api/coupon.ts"),
  route("api/course/:id", "routes/api/course.ts"),
] satisfies RouteConfig;
