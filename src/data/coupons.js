import { formatPrice } from '../utils/currency';

export const VALID_COUPONS = [
  {
    code: 'WELCOME20',
    type: 'percent',
    value: 20,
    minSpend: 50,
    description: '20% off your entire order'
  },
  {
    code: 'NOVA50',
    type: 'fixed',
    value: 50,
    minSpend: 250,
    description: 'Discount on orders over the minimum spend'
  },
  {
    code: 'AURA50',
    type: 'fixed',
    value: 50,
    minSpend: 250,
    description: 'Discount on orders over the minimum spend'
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 0,
    minSpend: 0,
    description: 'Free Express Priority Shipping'
  },
  {
    code: 'VIP30',
    type: 'percent',
    value: 30,
    minSpend: 300,
    description: '30% VIP Exclusive discount'
  }
];

export const describeCoupon = (coupon, currency) => {
  if (coupon.type === 'fixed') {
    return `${formatPrice(coupon.value, currency)} off orders over ${formatPrice(coupon.minSpend, currency)}`;
  }
  return coupon.description;
};
