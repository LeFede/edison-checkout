import type { Route } from "./+types/home";
import ProcessPage from "~/process/process";
import Loading from "~/components/Loading";
import useFetchCourse from "~/hooks/useFetchCourse";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edison Checkout" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Process() {
  const { isLoading, error } = useFetchCourse();

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return <ProcessPage />;
}
