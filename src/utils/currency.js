export const CURRENCIES = {
  INR: { symbol: '₹', rate: 83.5, label: 'INR (₹)', code: 'INR' }
};

export const formatPrice = (amountInUSD, currency = 'USD') => {
  const curr = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = amountInUSD * curr.rate;
  if (currency === 'INR') {
    return `${curr.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};
