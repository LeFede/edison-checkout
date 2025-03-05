import type { Route } from "./+types/home";
import AboutPage from "~/about/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "hola" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <AboutPage />;
}
