import type { ReactNode, FC } from "react";
import extendComponent from "~/utils/extendComponent";

interface BlockProps {
  children: ReactNode;
  className?: string;
}

const Title: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <p className="text-[var(--primary-700)] font-semibold mb-1">{children}</p>
  );
};

const Sub: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className="text-[var(--gray-500)] text-sm mb-4">{children}</p>;
};

const Block: FC<BlockProps> = ({ children, className }) => {
  return (
    <div
      className={`
      bg-[var(--gray-100)] 
      border 
      border-[var(--gray-300)] 
      text-[var(--gray-900)]
      rounded-lg
      p-4
      overflow-hidden
      w-full
      flex flex-col
      peer-checked:shadow-[inset_0px_0px_0px_3px_var(--anuncios-400)]
      justify-center
      ${className}
      `}
    >
      {children}
    </div>
  );
};

export default extendComponent(Block, { Title, Sub });
