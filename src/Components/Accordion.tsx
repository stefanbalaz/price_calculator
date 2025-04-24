interface AccordionProps {
  drinkSoldAmount: number | null;
  drinkPriceTotalNet: number | null;
  drinkPriceTotalGross: number | null;
  bottleAmountSubtotal: number | null;
  bottlePriceSubtotal: number | null;
  crateAmountSubtotal: number | null;
  cratePriceSubtotal: number | null;
  totalPriceNet: number | null;
  totalPriceGross: number | null;
  vat: number | null;
  sugarCaffeineTax: number | null;
  drinkPriceNet: number | null;
  bottlePrice: number | null;
  cratePrice: number | null;
  bottlePriceSoldTotal: number | null;
  bottleReceivedAmount: number | null;
  bottlePriceReceivedTotal: number | null;
  crateSoldAmount: number | null;
  cratePriceSoldTotal: number | null;
  crateReceivedAmount: number | null;
  cratePriceReceivedTotal: number | null;
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const {
    drinkSoldAmount,
    drinkPriceTotalNet,
    drinkPriceTotalGross,
    bottleAmountSubtotal,
    bottlePriceSubtotal,
    crateAmountSubtotal,
    cratePriceSubtotal,
    totalPriceNet,
    totalPriceGross,
    vat,
    sugarCaffeineTax,
    drinkPriceNet,
    bottlePrice,
    cratePrice,
    bottlePriceSoldTotal,
    bottleReceivedAmount,
    bottlePriceReceivedTotal,
    crateSoldAmount,
    cratePriceSoldTotal,
    crateReceivedAmount,
    cratePriceReceivedTotal,
  } = props;

  return (
    <>
      {" "}
      {/* Accordion with final price calculation */}
      <div className="accordion mb-3" id="accordionFinalCalculation">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              Final Calculation
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body table-responsive">
              <table className="table mb-4 text-left table-light table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Amount</th>
                    <th>Net</th>
                    <th>VAT</th>
                    <th>Sugar & Caffeine Tax</th>
                    <th>Gross</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th>Drink Subtotal</th>
                    <td>+{drinkSoldAmount}</td>
                    <td>+{(drinkPriceTotalNet ?? 0).toFixed(2)}€</td>
                    <td>
                      +
                      {(
                        (vat ?? 0) *
                        (drinkSoldAmount ?? 0) *
                        (drinkPriceNet ?? 0)
                      ).toFixed(2)}
                      €
                    </td>
                    <td>
                      +
                      {(
                        (sugarCaffeineTax ?? 0) * (drinkSoldAmount ?? 0)
                      ).toFixed(2)}
                      €
                    </td>
                    <td>+{(drinkPriceTotalGross ?? 0).toFixed(2)}€</td>
                  </tr>
                  <tr>
                    <th>Bottle Subtotal</th>
                    <td>
                      {(bottleAmountSubtotal ?? 0) > 0
                        ? `+${bottleAmountSubtotal}`
                        : bottleAmountSubtotal}
                    </td>
                    <td>
                      {(bottlePriceSubtotal ?? 0) > 0
                        ? `+${(bottlePriceSubtotal ?? 0).toFixed(2)}`
                        : (bottlePriceSubtotal ?? 0).toFixed(2)}
                      €
                    </td>
                    <td>0.00€</td>
                    <td>0.00€</td>
                    <td>
                      {(bottlePriceSubtotal ?? 0) > 0
                        ? `+${(bottlePriceSubtotal ?? 0).toFixed(2)}`
                        : (bottlePriceSubtotal ?? 0).toFixed(2)}
                      €
                    </td>
                  </tr>
                  <tr>
                    <th>Crate Subtotal</th>
                    <td>
                      {(crateAmountSubtotal ?? 0) > 0
                        ? `+${crateAmountSubtotal}`
                        : crateAmountSubtotal}
                    </td>
                    <td>
                      {(cratePriceSubtotal ?? 0) > 0
                        ? `+${(cratePriceSubtotal ?? 0).toFixed(2)}`
                        : (cratePriceSubtotal ?? 0).toFixed(2)}
                      €
                    </td>
                    <td>0.00€</td>
                    <td>0.00€</td>
                    <td>
                      {(cratePriceSubtotal ?? 0) > 0
                        ? `+${(cratePriceSubtotal ?? 0).toFixed(2)}`
                        : (cratePriceSubtotal ?? 0).toFixed(2)}
                      €
                    </td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td></td>
                    <td>
                      {(totalPriceNet ?? 0) > 0
                        ? `+${(totalPriceNet ?? 0).toFixed(2)}€`
                        : `${(totalPriceNet ?? 0).toFixed(2)}€`}
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      {(totalPriceGross ?? 0) > 0
                        ? `+${(totalPriceGross ?? 0).toFixed(2)}€`
                        : `${(totalPriceGross ?? 0).toFixed(2)}€`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Accordion with price table */}
      <div className="accordion mb-3" id="accordionPriceTable">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Price Details
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body table-responsive">
              <table className="table mb-4 text-left table-success table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Net</th>
                    <th>VAT</th>
                    <th>Sugar & Caffeine Tax</th>
                    <th>Gross</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th>Drink</th>
                    <td>{drinkPriceNet || 0}€</td>
                    <td>{(vat ?? 0) * 100}%</td>
                    <td>{(sugarCaffeineTax ?? 0).toFixed(3)}€</td>
                    <td>
                      {((drinkPriceNet ?? 0) * (1 + (vat || 0))).toFixed(2)}€
                    </td>
                  </tr>
                  <tr>
                    <th>Bottle</th>
                    <td>{bottlePrice || 0}€</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>{bottlePrice || 0}€</td>
                  </tr>
                  <tr>
                    <th>Crate</th>
                    <td>{cratePrice || 0}€</td>
                    <td>0%</td>
                    <td>0%</td>
                    <td>{cratePrice || 0}€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Accordion with calculation details */}
      <div className="accordion mb-3" id="accordionCalculationDetails">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              Calculation Details
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body table-responsive">
              {/* Display the drink table */}
              <table className="table mb-4 text-left caption-top table-danger table-striped table-hover table-bordered">
                <caption>DRINK</caption>
                <thead>
                  <tr>
                    <th></th>
                    <th>Amount</th>
                    <th>Net</th>
                    <th>VAT</th>
                    <th>Sugar & Caffeine Tax</th>
                    <th>Gross</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th>Sold</th>
                    {/* <td>+{drinkSoldAmount}</td>
                    <td>+{(drinkPriceTotalNet ?? 0).toFixed(2)}€</td>
                    <td>+{(drinkPriceTotalGross ?? 0).toFixed(2)}€</td> */}
                    <td>+{drinkSoldAmount}</td>
                    <td>+{(drinkPriceTotalNet ?? 0).toFixed(2)}€</td>
                    <td>
                      +
                      {(
                        (vat ?? 0) *
                        (drinkSoldAmount ?? 0) *
                        (drinkPriceNet ?? 0)
                      ).toFixed(2)}
                      €
                    </td>
                    <td>
                      +
                      {(
                        (sugarCaffeineTax ?? 0) * (drinkSoldAmount ?? 0)
                      ).toFixed(2)}
                      €
                    </td>
                    <td>+{(drinkPriceTotalGross ?? 0).toFixed(2)}€</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    {/* <td>+{drinkSoldAmount}</td>
                    <td>+{(drinkPriceTotalNet ?? 0).toFixed(2)}€</td>
                    <td>+{(drinkPriceTotalGross ?? 0).toFixed(2)}€</td> */}
                    <td>+{drinkSoldAmount}</td>
                    <td>+{(drinkPriceTotalNet ?? 0).toFixed(2)}€</td>
                    <td>
                      +
                      {(
                        (vat ?? 0) *
                        (drinkSoldAmount ?? 0) *
                        (drinkPriceNet ?? 0)
                      ).toFixed(2)}
                      €
                    </td>
                    <td>
                      +
                      {(
                        (sugarCaffeineTax ?? 0) * (drinkSoldAmount ?? 0)
                      ).toFixed(2)}
                      €
                    </td>
                    <td>+{(drinkPriceTotalGross ?? 0).toFixed(2)}€</td>
                  </tr>
                </tbody>
              </table>

              {/* Display the bottle table */}
              <table className="table mb-4 text-left caption-top table-warning table-striped table-hover table-bordered">
                <caption>BOTTLE</caption>
                <thead>
                  <tr>
                    <th></th>
                    <th>Amount</th>
                    <th>Net</th>
                    <th>Gross</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th>Sold</th>
                    <td>+{drinkSoldAmount}</td>
                    <td>+{(bottlePriceSoldTotal ?? 0).toFixed(2)}€</td>
                    <td>+{(bottlePriceSoldTotal ?? 0).toFixed(2)}€</td>
                  </tr>
                  <tr>
                    <th>Received</th>
                    <td>-{bottleReceivedAmount}</td>
                    <td>-{(bottlePriceReceivedTotal ?? 0).toFixed(2)}€</td>
                    <td>-{(bottlePriceReceivedTotal ?? 0).toFixed(2)}€</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>
                      {(bottleAmountSubtotal ?? 0) > 0
                        ? `+${bottleAmountSubtotal}`
                        : bottleAmountSubtotal}
                    </td>
                    <td>
                      {(bottlePriceSubtotal ?? 0) > 0
                        ? `+${(bottlePriceSubtotal ?? 0).toFixed(2)}`
                        : (bottlePriceSubtotal ?? 0).toFixed(2)}
                      €
                    </td>
                    <td>
                      {(bottlePriceSubtotal ?? 0) > 0
                        ? `+${(bottlePriceSubtotal ?? 0).toFixed(2)}`
                        : (bottlePriceSubtotal ?? 0).toFixed(2)}
                      €
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Display the crate table */}
              <table className="table mb-4 text-left caption-top table-primary table-striped table-hover table-bordered">
                <caption>CRATE</caption>
                <thead>
                  <tr>
                    <th></th>
                    <th>Amount</th>
                    <th>Net</th>
                    <th>Gross</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th>Sold</th>
                    <td>+{crateSoldAmount}</td>
                    <td>+{(cratePriceSoldTotal ?? 0).toFixed(2)}€</td>
                    <td>+{(cratePriceSoldTotal ?? 0).toFixed(2)}€</td>
                  </tr>
                  <tr>
                    <th>Received</th>
                    <td>-{crateReceivedAmount}</td>
                    <td>-{(cratePriceReceivedTotal ?? 0).toFixed(2)}€</td>
                    <td>-{(cratePriceReceivedTotal ?? 0).toFixed(2)}€</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>
                      {(crateAmountSubtotal ?? 0) > 0
                        ? `+${crateAmountSubtotal}`
                        : crateAmountSubtotal}
                    </td>
                    <td>
                      {(cratePriceSubtotal ?? 0) > 0
                        ? `+${(cratePriceSubtotal ?? 0).toFixed(2)}`
                        : (cratePriceSubtotal ?? 0).toFixed(2)}
                      €
                    </td>
                    <td>
                      {(cratePriceSubtotal ?? 0) > 0
                        ? `+${(cratePriceSubtotal ?? 0).toFixed(2)}`
                        : (cratePriceSubtotal ?? 0).toFixed(2)}
                      €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
