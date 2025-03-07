const formatPrice = (value: number, isArgentina: boolean | string) => {
  const fixedValue = value.toFixed(2);
  return isArgentina
    ? (+fixedValue.replace(".", ",").replace(/,00/, ""))
        .toLocaleString("es")
        .toString()
    : (+fixedValue.replace(/.00$/, ""))
        .toLocaleString("us")
        .toString()
        .replace(/(\.\d$)/, "$10");
};

export default formatPrice;
