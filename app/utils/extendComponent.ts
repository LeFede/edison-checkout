import type { FC } from "react";

function extendComponent<T extends FC<any>, C extends Record<string, FC<any>>>(
  component: T,
  extensions: C
): T & C {
  return Object.assign(component, extensions);
}

export default extendComponent;
