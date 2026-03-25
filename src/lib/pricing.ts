export const priceTiers = {
  premium: [
    { min: 1, max: 20, price: 290 },
    { min: 21, max: 50, price: 280 },
    { min: 51, max: 100, price: 260 },
    { min: 101, max: 300, price: 240 },
    { min: 301, max: 500, price: 220 },
    { min: 501, max: Infinity, price: 220 },
  ],
  oversize: [
    { min: 1, max: 20, price: 320 },
    { min: 21, max: 50, price: 310 },
    { min: 51, max: 100, price: 290 },
    { min: 101, max: 300, price: 270 },
    { min: 301, max: 500, price: 250 },
    { min: 501, max: Infinity, price: 250 },
  ],
};

export const getPricePerItem = (type: 'premium' | 'oversize', quantity: number): number => {
  if (!type || quantity < 1) return 0;
  const tiers = priceTiers[type];
  const tier = tiers.find(t => quantity >= t.min && quantity <= t.max);
  return tier ? tier.price : 0;
};

export const PRICE_PER_EXTRA_SPOT = 30;
