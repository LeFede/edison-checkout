import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Title: FC<Props> = ({ children }) => {
  return <p className="text-black font-semibold text-lg mb-4">{children}</p>;
};

export default Title;
