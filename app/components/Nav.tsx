import type { ReactNode } from "react";

interface Props {
  tags: ReactNode;
}

const Nav: React.FC<Props> = ({ tags }) => {
  return (
    <>
      <div className="h-12 max-lg:h-16"></div>
      {tags && <div className="h-16 max-lg:h-16 lg:hidden relative" />}
      <div className="fixed top-0 left-0 w-full bg-[var(--gray-100)] border-[var(--gray-300)] border h-12 ">
        <a href="">
          <img
            src="/arrow_circle.svg"
            className="absolute z-50 top-[50%] -translate-y-[50%] left-4"
          />
        </a>
        <nav className="flex justify-center z-10 h-full items-center">
          <img src="/edison.png" className="h-6" />
        </nav>
        {tags && (
          <div
            className="
          bg-gradient-to-r from-[var(--orange-1)] to-[var(--orange-2)] w-full text-white p-1  justify-center lg:hidden max-lg:flex text-sm"
          >
            {tags}
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
