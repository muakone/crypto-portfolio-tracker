export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value: number, fractionDigits = 2): string => {
  return `${value.toFixed(fractionDigits)}%`;
};

export const formatBalance = (balance: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(balance);
};

export const formatAmount = (value: number): string => {
  if (!value) return "0";
  if (value < 0.01) return value.toFixed(8);
  if (value < 1) return value.toFixed(6);
  if (value < 100) return value.toFixed(4);
  return value.toFixed(2);
};
