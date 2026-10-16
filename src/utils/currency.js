export const CURRENCIES = {
  INR: { symbol: '₹', rate: 83.5, label: 'INR (₹)', code: 'INR' },
  USD: { symbol: '$', rate: 1, label: 'USD ($)', code: 'USD' }
};

export const formatPrice = (amountInUSD, currency = 'INR') => {
  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = amountInUSD * curr.rate;
  if (currency === 'INR') {
    return `${curr.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};
