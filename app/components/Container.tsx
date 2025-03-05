import type { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
  return (
    <div className={`max-sm:px-4 max-w-[500px] m-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
