import type { Route } from "./+types/home";
import Waiting from "~/components/Waiting";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Procesando pago..." },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Waiting />;
}
