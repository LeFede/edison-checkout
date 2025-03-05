import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import courseAdapter from "~/adapters/courseAdapter";
import type { AdaptedCourse } from "~/env.d";
import secondsToMilis from "~/utils/secondsToMilis";

const fetchCourse = async (courseId: string) => {
  const res = await fetch(`/api/course/${courseId}`);
  if (!res.ok) throw new Error("Error fetching course data");
  const data = await res.json();
  const adaptedCourse = courseAdapter(data);
  return adaptedCourse;
};

const useFetchCourse = () => {
  const { id: courseId } = useParams();

  return useQuery<AdaptedCourse>({
    queryKey: ["course"],
    queryFn: () => fetchCourse(courseId || ""),
    staleTime: secondsToMilis(10),
  });
};

export default useFetchCourse;
