import { useEffect } from "react";
import useRetrieveUrlData from "./useRetrieveUrlData";
import { useStore } from "@nanostores/react";
import { $course } from "~/store";

const useCreateLead = () => {
  const courseState = useStore($course);
  const params = useRetrieveUrlData();

  useEffect(() => {
    const createLead = async () => {
      try {
        const res = await fetch("/api/createLead", {
          method: "POST",
          body: JSON.stringify({
            ...params,
            courseRid: courseState.courseRid,
            courseId: courseState.courseId,
          }),
        });

        const data = await res.json();

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    createLead();
  }, []);
};

export default useCreateLead;
