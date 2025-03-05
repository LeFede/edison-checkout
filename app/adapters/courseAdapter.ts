import { diffDays } from "@formkit/tempo";
import type { Course, AdaptedCourse } from "~/env.d";
import { format } from "@formkit/tempo";

function courseAdapter(course: Course): AdaptedCourse {
  // const daysTilCourse = diffDays(
  //   course?.events?.at(0)?.startTime || new Date(),
  //   new Date()
  // );
  const daysTilCourse = 3;

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

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const startTime = course.events.at(0)?.startTime || "";
  const finishTime = course.events.at(-1)?.startTime || "";

  const start = format({
    date: startTime,
    format: "medium",
    locale: "es",
    tz: timeZone,
  }).replace(/ 20../, "");

  const finish = format({
    date: finishTime,
    format: "medium",
    locale: "es",
    tz: timeZone,
  }).replace(/(\d{1,2} \w{3}) (\d{4})/, "$1, $2");

  const finalDateString = start == finish ? start : `${start} - ${finish}`;

  return {
    alreadyStarted: daysTilCourse < 0,
    comingSoon: course?.config?.comingSoon || false,
    courseId: course.id,
    courseRid: course.courseRid,
    daysTilCourse,
    estado,
    finalDateString,
    finishTime,
    isAsync: course?.config?.isAsync || false,
    name: course.name,
    prices: course.prices,
    slug: course.urlLanding,
    startTime,
    type: course.type,
    users: course.users.map((user) => ({ name: user.user.name })),
  };
}

export default courseAdapter;
