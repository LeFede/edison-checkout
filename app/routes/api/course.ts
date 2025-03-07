import api from "~/axios";
import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async ({ params }) => {
  const { id: courseId } = params;

  try {
    const { data } = await api.get(`/courses/new/${courseId}`);
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, max-age=20, s-maxage=20, stale-while-revalidate=5",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch course data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
