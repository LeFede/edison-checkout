import { useNavigate } from "react-router";
import Block from "~/components/Block";
import Container from "~/components/Container";
import Title from "~/components/Title";
import Hr from "~/components/Hr";
import Nav from "~/components/Nav";
import { useEffect } from "react";
import { $originalUrl } from "~/store";
import toast from "react-hot-toast";
import useCreateLead from "~/hooks/useCreateLead";
import useRetrieveUrlData from "~/hooks/useRetrieveUrlData";
import { useQueryClient } from "@tanstack/react-query";
import type { AdaptedCourse } from "~/env.d";
import useCheckoutForm from "~/hooks/useCheckoutForm";
import useCalculatePrices from "~/hooks/useCalculatePrices";

const ProcessPage = () => {
  /* ══════════════════════════ Hooks ═══════════════════════════════════════ */
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useRetrieveUrlData();
  const formHook = useCheckoutForm();
  const prices = useCalculatePrices();
  useCreateLead();

  /* ══════════════════════════ Extraccion ══════════════════════════════════ */
  const courseState = queryClient.getQueryData(["course"]) as AdaptedCourse;

  const { email } = params;

  const {
    register,
    handleSubmit,
    formState: { errors },
    appliedDiscount,
    handleCoupon,
    watch,
  } = formHook;

  const {
    finalPriceString,
    cupos,
    symbol,
    twoPaymentsOriginalString,
    twoPaymentsString,
    fullPriceString,
    currency,
    isArgentina,
  } = prices;

  /* ══════════════════════════ Resto del Componente ════════════════════════ */

  useEffect(() => {
    $originalUrl.set(window.location.href);
  }, []);

  const tags: any =
    {
      COMIENZA_PRONTO: (
        <>
          {courseState.daysTilCourse > 5 &&
            courseState.daysTilCourse < 10 &&
            "Comienza pronto"}
          {courseState.daysTilCourse < 5 &&
            `Comienza en ${courseState.daysTilCourse} días`}
        </>
      ),
    }[courseState.estado] || "";

  return (
    <>
      <Nav tags={tags} />
      <form
        className="flex flex-col lg:flex-row-reverse lg:gap-20 lg:p-12 lg:max-w-[1280px] m-auto"
        onSubmit={handleSubmit(
          (_) => {
            toast.dismiss();
            console.log(watch());
            navigate("/payment");
          },
          (e) => {
            toast.remove();
            if (e.paymentMethod) return toast.error("Elija un método de pago");
            if (e.payment) return toast.error("Elija un plan de pago");
          }
        )}
      >
        <div className="mb-8">
          <Container className="mb-4">
            <Title>Resumen</Title>
            <div className="flex-col flex gap-4">
              <Block>
                <Block.Title>{courseState.name}</Block.Title>
                <Block.Sub>
                  con {courseState.users.map((user) => user.name).join(" y ")}
                </Block.Sub>
                <div className="flex">
                  <div className="text-sm">
                    <div className="mb-1">
                      {courseState.isAsync ? (
                        <p className="flex gap-2 items-center">
                          <img src="/camera.svg" />
                          curso grabado
                        </p>
                      ) : (
                        courseState.finalDateString
                      )}
                    </div>
                    <p className="flex gap-2 justify-start items-start">
                      {cupos} cupo{cupos > 1 && "s"}
                      <span className="text-[var(--gray-300)]">|</span>
                      agregar
                    </p>
                  </div>

                  <div className="ml-auto flex flex-col justify-end items-end">
                    {appliedDiscount > 0 && (
                      <p className="line-through text-xs">
                        {symbol}
                        {fullPriceString} {currency}
                      </p>
                    )}
                    <p className="font-semibold">
                      {symbol}
                      {finalPriceString} {currency}
                    </p>
                  </div>
                </div>
              </Block>
              <Block className="flex-row justify-between gap-2">
                <span>{email}</span>
                <span className="ml-auto text-[var(--gray-300)]">|</span>
                <span className="text-[var(--gray-500)] underline underline-offset-4">
                  editar
                </span>
              </Block>
            </div>
          </Container>
          {tags && (
            <div className="bg-gradient-to-r from-[var(--orange-1)] to-[var(--orange-2)] w-full text-white p-1 rounded-lg justify-center hidden lg:flex text-sm">
              {tags}
            </div>
          )}
        </div>

        <div className="flex-1 w-full max-w-[540px] m-auto">
          <Container className="lg:hidden">
            <Hr />
          </Container>

          <Container className="flex flex-col gap-8">
            {isArgentina && (
              <div className={`${!isArgentina && "hidden"}`}>
                <Title>1. Selecciona un método de pago</Title>
                <div className="flex gap-4 flex-col xss:flex-row">
                  <label className="flex flex-col justify-between items-center flex-1 gap-1">
                    <input
                      type="radio"
                      className="hidden peer"
                      value="mp"
                      {...register("paymentMethod")}
                    />
                    <Block className="items-center box-border cursor-pointer">
                      <img src="/mp2.png" className="h-10 object-contain" />
                    </Block>
                    <p className="text-gray-500 text-xs">Paga en ARS</p>
                  </label>

                  <label className="flex flex-col justify-center items-center flex-1 gap-1">
                    <input
                      type="radio"
                      className="hidden peer"
                      value="stripe"
                      {...register("paymentMethod")}
                    />
                    <Block className="h-auto items-center box-border cursor-pointer">
                      <img src="/stripe2.png" className="h-10 object-contain" />
                    </Block>
                    <p className="text-gray-500 text-xs">Paga en USD</p>
                  </label>
                </div>
                {errors.paymentMethod && (
                  <span className="text-red-500">Elija un metodo de pago</span>
                )}
              </div>
            )}

            {!isArgentina && (
              <input
                type="radio"
                className="hidden peer"
                value="stripe"
                checked={true}
                {...register("paymentMethod")}
              />
            )}

            <div>
              <Title>{isArgentina && "2."} Elige un plan de pago</Title>
              <div className="flex flex-col text-sm gap-2">
                <label className="flex gap-2 cursor-pointer w-fit">
                  <input
                    type="radio"
                    value="1pago"
                    {...register("payment")}
                    className="cursor-pointer"
                  />
                  1 pago de {symbol}
                  {finalPriceString} {currency}{" "}
                  {appliedDiscount > 0 && (
                    <span className="line-through text-gray-500">
                      {symbol}
                      {fullPriceString}
                    </span>
                  )}
                </label>
                <div className="flex-col flex">
                  <label className="flex gap-2 mb-1 cursor-pointer w-fit">
                    <input
                      type="radio"
                      value="2pagos"
                      {...register("payment")}
                      className="cursor-pointer"
                    />
                    2 pagos de {symbol}
                    {twoPaymentsString} {currency}{" "}
                    {appliedDiscount > 0 && (
                      <span className="line-through text-gray-500">
                        {symbol}
                        {twoPaymentsOriginalString}
                      </span>
                    )}
                  </label>
                  <span className="text-xs text-[var(--gray-500)] max-w-1/2 ml-5">
                    El segundo pago se debita de manera automática 30 días
                    después del pago inicial.
                  </span>
                </div>
              </div>

              {errors.payment && (
                <span className="text-red-500">Elija un plan de pago</span>
              )}
            </div>

            <div className="mb-8 max-w-screen">
              <label htmlFor="coupon" className="mb-1 block">
                Cupón de descuento
              </label>
              <div className="flex gap-4 max-xs:flex-col flex-row">
                <input
                  id="coupon"
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCoupon();
                    }
                  }}
                  {...register("coupon")}
                  className="flex-1 p-2.5 rounded-lg border-[var(--gray-300)] border bg-[var(--gray-100)]"
                  placeholder="Código"
                />
                <button
                  className="bg-[var(--gray-100)] border border-[var(--primary-700)] px-4 py-2.5 rounded-lg cursor-pointer"
                  onClick={handleCoupon}
                  type="button"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </Container>

          {isArgentina && (
            <>
              <Container>
                <Hr />
              </Container>

              <Container className="mb-8">
                <Title>3. Facturación</Title>
                <label className="flex gap-2 cursor-pointer w-fit">
                  <input type="checkbox" {...register("factura")} />
                  Quiero factura
                </label>
              </Container>

              <Container>
                <Hr />
              </Container>
            </>
          )}

          <Container className="mb-8">
            <a
              className="text-center flex justify-center gap-2 text-gray-500"
              // href={`https://api.whatsapp.com/send/?phone=5491123913070&text=Hola!%20Estoy%20interesado%20en%20el%20curso%20(${courseState.name})%20y%20tengo%20la%20siguiente%20duda.`}
              href={`https://wa.me/5491123913070?text=Hola!%20Estoy%20interesado%20en%20el%20curso%20(${courseState.name})%20y%20tengo%20la%20siguiente%20duda.`}
              target="_blank"
            >
              ¿Necesitas ayuda? <img src="/question.svg" />
            </a>
          </Container>

          <Container className="max-lg:fixed bottom-0 max-lg:left-0 max-lg:w-screen max-lg:max-w-screen max-lg:p-4 max-lg:bg-white max-lg:border max-lg:border-gray-200">
            <button
              className="bg-[var(--primary-700)] text-white w-full p-4 rounded-lg flex gap-2 justify-center items-center cursor-pointer font-medium"
              type="submit"
            >
              Continuar con el pago
              <img src="/arrow.svg" />
            </button>
          </Container>
        </div>
      </form>

      <pre>
        <code>{JSON.stringify(courseState, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(params, null, 2)}</code>
      </pre>
    </>
  );
};

export default ProcessPage;
