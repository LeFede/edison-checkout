
import type { Route } from "./+types/home";
import ProcessPage from "~/process/process";
import api from "~/../axios";
import type { Course, Price, User } from "~/env.d";
import { diffDays } from "@formkit/tempo";
import { $course } from "~/store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "process" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id: courseId } = params;
  const { data } = await api.get(`/courses/new/${courseId}`);
  return data as Course;
}

export interface AdaptedCourse {
  finishTime: string;
  name: string;
  prices: Price[];
  slug: string;
  startTime: string;
  users: Pick<User, "name">[];
  isAsync: boolean;
  type: string;
  comingSoon: boolean;
  estado: string;
  alreadyStarted: boolean;
  daysTilCourse: number;
  courseId: number;
  courseRid: string;
}

function adaptCourse(course: Course): AdaptedCourse {
  const daysTilCourse = diffDays(
    course?.events?.at(0)?.startTime || new Date(),
    new Date()
  );

  let estado = course.config.isAsync
    ? course?.type === "WORKSHOP"
      ? "QUICK_LEARN"
      : ""
    : course?.config?.comingSoon
    ? "PROXIMAMENTE"
    : daysTilCourse < 2 && daysTilCourse > 0
    ? "ULTIMO_LLAMADO"
    : course?.events.length == 1 || course?.type == "WORKSHOP"
    ? "QUICK_LEARN"
    : false
    ? "ULTIMOS_CUPOS"
    : daysTilCourse < 14 && daysTilCourse > 0
    ? "COMIENZA_PRONTO"
    : course?.edition == 1
    ? "NUEVO"
    : "NORMAL";

  return {
    finishTime: course.events.at(-1)?.startTime || "",
    name: course.name,
    prices: course.prices,
    slug: course.urlLanding,
    startTime: course.events.at(0)?.startTime || "",
    users: course.users.map((user) => ({ name: user.user.name })),
    isAsync: course?.config?.isAsync || false,
    type: course.type,
    comingSoon: course?.config?.comingSoon || false,
    estado,
    alreadyStarted: daysTilCourse < 0,
    daysTilCourse,
    courseRid: course.courseRid,
    courseId: course.id,
  };

  // const {
  //   urlLanding: href,
  //   users,
  //   config,
  //   name: courseName,
  //   events,
  //   category,
  //   type,
  //   stock,
  //   edition,
  // } = course;
  // const { startTime } = events?.[0] || { startTime: "" };
  // let { value: categoryName, htmlColor: categoryColor } = category || {
  //   value: "",
  //   htmlColor: "",
  // };
  // const { isAsync } = config || { isAsync: false };
  // const isAsyncText = isAsync ? "Curso grabado" : "Curso en vivo";
  // if (categoryColor == "#039855") categoryColor = "#037C46";
  // const { comingSoon } = config;
  //
  // const finalUsers = users.filter((user) => user?.user?.name != "Ánkyra");
}

interface Loader {
  loaderData: Course;
}

export default function Process({ loaderData }: Loader) {
  const adaptedCourse = adaptCourse(loaderData);

  $course.set(adaptedCourse);

  return <ProcessPage adaptedCourse={adaptedCourse} />;
}
