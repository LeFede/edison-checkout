import { $originalUrl } from "~/store";
import Container from "./Container";
import { useNavigate } from "react-router";

const Waiting = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 flex h-screen max-w-96 m-auto">
      <div className="flex-1 w-full flex flex-col justify-center items-center">
        <img src="/longing.png" className="mb-4" />
        <p className="text-2xl font-bold text-[var(--primary-700)] mb-20">
          Pago en proceso...
        </p>
        <p className="font-bold text-lg text-gray-900 w-full text-left mb-2">
          Esto puede demorar un par de minutos.
        </p>
        <p className="text-sm text-gray-900 mb-10 w-full text-left">
          Si ya realizaste el pago, puedes dirigirte a la plataforma de
          estudiantes.
        </p>
        <button className="font-medium text-[var(--gray-25)] bg-[var(--primary-700)] w-full rounded-lg py-3 mb-10 cursor-pointer">
          Plataforma de estudiantes
        </button>
        <button
          onClick={() => navigate(-1)}
          className="font-bold underline text-gray-900 mb-2 cursor-pointer"
        >
          Intentar nuevamente
        </button>
        <p className="text-sm text-gray-500">Volverás a la pantalla de pago.</p>
      </div>
    </div>
  );
};

export default Waiting;
