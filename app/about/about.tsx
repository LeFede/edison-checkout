// https://checkout.somosedison.com/presentaciones-que-conectan?area=54&country=Argentina&num=11111111&name=Federico%20Andres&email=federico%2B1%40somosedison.com

import { useLocation, useSearchParams } from "react-router";

export default function About() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const params = Object.fromEntries(searchParams.entries());
  const [course] = location.pathname.split("/").filter((e) => e);

  return <code>{JSON.stringify(params, null, 2)}</code>;
}
