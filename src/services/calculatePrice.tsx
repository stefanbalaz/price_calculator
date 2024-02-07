export function calculatePrice(
  drinkPriceNet: number | null,
  drinkSoldAmount: number | null,
  crateSoldAmount: number | null,
  bottleReceivedAmount: number | null,
  crateReceivedAmount: number | null,
  vat: number | null,
  bottlePrice: number | null,
  cratePrice: number | null
): {
  drinkPriceGross: number;
  totalPriceNet: number;
  totalPriceGross: number;
  drinkPriceTotalNet: number;
  drinkPriceTotalGross: number;
  bottlePriceSoldTotal: number;
  bottlePriceReceivedTotal: number;
  cratePriceSoldTotal: number;
  cratePriceReceivedTotal: number;
  bottlePriceSubtotal: number;
  cratePriceSubtotal: number;
  bottleAmountSubtotal: number;
  crateAmountSubtotal: number;
} {
  /*   Vat multiplier */
  const vatMultiplier = vat !== null ? 1 + vat : 1;
  console.log("vatMultiplier", vatMultiplier);

  /*   Drink Price Gross */
  const drinkPriceGross = (drinkPriceNet || 0) * vatMultiplier;
  console.log("drinkPriceGross", drinkPriceGross);

  /* Drink Price Total Net */
  const drinkPriceTotalNet = (drinkSoldAmount || 0) * (drinkPriceNet || 0);
  console.log("drinkPriceTotalNet", drinkPriceTotalNet);

  /* Drink Price Total Gross */
  const drinkPriceTotalGross =
    (drinkSoldAmount || 0) * ((drinkPriceNet || 0) * vatMultiplier);
  console.log("drinkPriceTotalGross", drinkPriceTotalGross);

  /* Bollte Price Sold Total */
  const bottlePriceSoldTotal = (drinkSoldAmount || 0) * (bottlePrice || 0);
  console.log("bottlePriceSoldTotal", bottlePriceSoldTotal);

  /* Bollte Price Received Total */
  const bottlePriceReceivedTotal =
    (bottleReceivedAmount || 0) * (bottlePrice || 0);
  console.log("bottlePriceReceivedTotal", bottlePriceReceivedTotal);

  /* Crate Price Sold Total */
  const cratePriceSoldTotal = (crateSoldAmount || 0) * (cratePrice || 0);
  console.log("cratePriceSoldTotal", cratePriceSoldTotal);

  /* Crate Price Received Total */
  const cratePriceReceivedTotal =
    (crateReceivedAmount || 0) * (cratePrice || 0);
  console.log("cratePriceReceivedTotal", cratePriceReceivedTotal);

  /* Bottle Price Subtotal */
  const bottlePriceSubtotal = bottlePriceSoldTotal - bottlePriceReceivedTotal;
  console.log("bottlePriceSubtotal", bottlePriceSubtotal);

  /* Crate Price Subtotal */
  const cratePriceSubtotal = cratePriceSoldTotal - cratePriceReceivedTotal;
  console.log("cratePriceSubtotal", cratePriceSubtotal);

  /* Bottle Amount Subtotal */
  const bottleAmountSubtotal =
    (drinkSoldAmount || 0) - (bottleReceivedAmount || 0);
  console.log("bottleAmountSubtotal", bottleAmountSubtotal);

  /* Crate Amount Subtotal */
  const crateAmountSubtotal =
    (crateSoldAmount || 0) - (crateReceivedAmount || 0);
  console.log("crateAmountSubtotal", crateAmountSubtotal);

  /* Total Price Net */
  const totalPriceNet =
    drinkPriceTotalNet +
    bottlePriceSoldTotal -
    bottlePriceReceivedTotal +
    cratePriceSoldTotal -
    cratePriceReceivedTotal;
  console.log("totalPriceNet", totalPriceNet.toFixed(2));

  /* Total Price Gross */
  const totalPriceGross =
    drinkPriceTotalGross +
    bottlePriceSoldTotal -
    bottlePriceReceivedTotal +
    cratePriceSoldTotal -
    cratePriceReceivedTotal;
  console.log("totalPriceGross", totalPriceGross.toFixed(2));

  return {
    drinkPriceGross,
    totalPriceNet,
    totalPriceGross,
    // vatMultiplier,
    drinkPriceTotalNet,
    drinkPriceTotalGross,
    bottlePriceSoldTotal,
    bottlePriceReceivedTotal,
    cratePriceSoldTotal,
    cratePriceReceivedTotal,
    bottlePriceSubtotal,
    cratePriceSubtotal,
    bottleAmountSubtotal,
    crateAmountSubtotal,
  };
}
