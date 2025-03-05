import { useSearchParams } from "react-router";

const useRetrieveUrlData = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  return params;
};

export default useRetrieveUrlData;
