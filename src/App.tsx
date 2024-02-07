import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap";
/* import Email from "./Components/Email"; */
import Form from "./Components/Form";
import emailjs from "@emailjs/browser";

function App(): JSX.Element {
  const [drinkPriceNet, setDrinkPriceNet] = useState<number | null>(0.75);
  const [drinkSoldAmount, setDrinkSoldAmount] = useState<number | null>(0);
  const [crateSoldAmount, setCrateSoldAmount] = useState<number | null>(0);

  const [bottleReceivedAmount, setBottleReceivedAmount] = useState<
    number | null
  >(0);
  const [crateReceivedAmount, setCrateReceivedAmount] = useState<number | null>(
    0
  );

  const [drinkPriceGross, setDrinkPriceGross] = useState<number | null>(null);
  const [bottlePrice] = useState<number | null>(0.13);
  const [cratePrice] = useState<number | null>(1.66);
  const [vat] = useState<number | null>(0.2);
  //const [vatMultiplier, setVatMultiplier] = useState<number | null>(null);
  const [drinkPriceTotalNet, setDrinkPriceTotalNet] = useState<number | null>(
    null
  );
  const [drinkPriceTotalGross, setDrinkPriceTotalGross] = useState<
    number | null
  >(null);
  const [bottlePriceSoldTotal, setBottlePriceSoldTotal] = useState<
    number | null
  >(null);
  const [bottlePriceReceivedTotal, setBottlePriceReceivedTotal] = useState<
    number | null
  >(null);
  const [bottlePriceSubtotal, setBottlePriceSubtotal] = useState<number | null>(
    null
  );
  const [cratePriceSubtotal, setCratePriceSubtotal] = useState<number | null>(
    null
  );
  const [bottleAmountSubtotal, setBottleAmountSubtotal] = useState<
    number | null
  >(0);
  const [crateAmountSubtotal, setCrateAmountSubtotal] = useState<number | null>(
    0
  );
  const [cratePriceSoldTotal, setCratePriceSoldTotal] = useState<number | null>(
    null
  );
  const [cratePriceReceivedTotal, setCratePriceReceivedTotal] = useState<
    number | null
  >(null);
  const [totalPriceNet, setTotalPriceNet] = useState<number>(0);
  const [totalPriceGross, setTotalPriceGross] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [calculatedPrice, setCalculatedPrice] = useState<any>(null);

  function calculatePrice(): {
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

  // Use useEffect to perform calculations after the component has rendered
  useEffect(() => {
    const updatedCalculatedPrice = calculatePrice();
    setCalculatedPrice(updatedCalculatedPrice);
  }, [
    drinkSoldAmount,
    crateSoldAmount,
    bottleReceivedAmount,
    crateReceivedAmount,
  ]);

  function handleButtonClick(): void {
    if (
      !drinkPriceNet ||
      drinkSoldAmount === null ||
      crateSoldAmount === null ||
      bottleReceivedAmount === null ||
      crateReceivedAmount === null ||
      (drinkSoldAmount <= 0 &&
        crateSoldAmount <= 0 &&
        bottleReceivedAmount <= 0 &&
        crateReceivedAmount <= 0)
    ) {
      setErrorMessage(
        "Please fill the price and at least one additional field with value greater than 0."
      );
      setTotalPriceGross(0);
      setTotalPriceNet(0);
      console.error("Validation error.");
      return;
    }

    //const calculatedPrice = calculatePrice();
    const updatedCalculatedPrice = calculatePrice();
    setCalculatedPrice(updatedCalculatedPrice);

    setErrorMessage(null);

    setDrinkPriceGross(calculatedPrice.drinkPriceGross);
    setTotalPriceGross(calculatedPrice.totalPriceGross);
    setTotalPriceNet(calculatedPrice.totalPriceNet);
    setDrinkPriceTotalNet(calculatedPrice.drinkPriceTotalNet);
    setDrinkPriceTotalGross(calculatedPrice.drinkPriceTotalGross);
    setBottleReceivedAmount(bottleReceivedAmount);
    setCrateReceivedAmount(crateReceivedAmount);
    setCrateSoldAmount(crateSoldAmount);
    setBottlePriceSoldTotal(calculatedPrice.bottlePriceSoldTotal);
    setBottlePriceReceivedTotal(calculatedPrice.bottlePriceReceivedTotal);
    setCratePriceSoldTotal(calculatedPrice.cratePriceSoldTotal);
    setCratePriceReceivedTotal(calculatedPrice.cratePriceReceivedTotal);
    setBottlePriceSubtotal(calculatedPrice.bottlePriceSubtotal);
    setCratePriceSubtotal(calculatedPrice.cratePriceSubtotal);
    setBottleAmountSubtotal(calculatedPrice.bottleAmountSubtotal);
    setCrateAmountSubtotal(calculatedPrice.crateAmountSubtotal);
  }

  /*   const handleInputChange = (field: string, value: number | null) => {
    switch (field) {
      case "drinkPriceNet":
        setDrinkPriceNet(value === "" ? null : value);
        break;
      case "drinkSoldAmount":
        setDrinkSoldAmount(value === "" ? null : value);
        break;
      case "crateSoldAmount":
        setCrateSoldAmount(value === "" ? null : value);
        break;
      case "bottleReceivedAmount":
        setBottleReceivedAmount(value === "" ? null : value);
        break;
      case "crateReceivedAmount":
        setCrateReceivedAmount(value === "" ? null : value);
        break;
      default:
        break;
    }
  };  */

  const handleInputChange = (field: string, value: number | null | string) => {
    switch (field) {
      case "drinkPriceNet":
        setDrinkPriceNet(
          value === null || value === ""
            ? null
            : typeof value === "string"
            ? parseFloat(value)
            : value
        );
        break;
      case "drinkSoldAmount":
        setDrinkSoldAmount(
          value === null || value === ""
            ? null
            : typeof value === "string"
            ? parseFloat(value)
            : value
        );
        break;
      case "crateSoldAmount":
        setCrateSoldAmount(
          value === null || value === ""
            ? null
            : typeof value === "string"
            ? parseFloat(value)
            : value
        );
        break;
      case "bottleReceivedAmount":
        setBottleReceivedAmount(
          value === null || value === ""
            ? null
            : typeof value === "string"
            ? parseFloat(value)
            : value
        );
        break;
      case "crateReceivedAmount":
        setCrateReceivedAmount(
          value === null || value === ""
            ? null
            : typeof value === "string"
            ? parseFloat(value)
            : value
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const templateParams = {
      drinkPriceNet: drinkPriceNet,
      drinkPriceGross: (drinkPriceGross ?? 0).toFixed(2),
      cratePrice: cratePrice,
      bottlePrice: bottlePrice,
      drinkSoldAmount: drinkSoldAmount,
      drinkPriceTotalNet: calculatedPrice?.drinkPriceTotalNet.toFixed(2),
      drinkPriceTotalGross: calculatedPrice?.drinkPriceTotalGross.toFixed(2),
      bottlePriceSoldTotal: calculatedPrice?.bottlePriceSoldTotal.toFixed(2),
      bottlePriceReceivedTotal:
        calculatedPrice?.bottlePriceReceivedTotal.toFixed(2),
      cratePriceSoldTotal: calculatedPrice?.cratePriceSoldTotal.toFixed(2),
      cratePriceReceivedTotal:
        calculatedPrice?.cratePriceReceivedTotal.toFixed(2),
      bottlePriceSubtotal: calculatedPrice?.bottlePriceSubtotal.toFixed(2),
      cratePriceSubtotal: calculatedPrice?.cratePriceSubtotal.toFixed(2),
      bottleAmountSubtotal: calculatedPrice?.bottleAmountSubtotal,
      crateAmountSubtotal: calculatedPrice?.crateAmountSubtotal,
      totalPriceNet: calculatedPrice?.totalPriceNet.toFixed(2),
      totalPriceGross: calculatedPrice?.totalPriceGross.toFixed(2),
      bottleReceivedAmount: bottleReceivedAmount,
      crateReceivedAmount: crateReceivedAmount,
      crateSoldAmount: crateSoldAmount,
    };

    console.log("YYYYYYtemplateParams inside handle submit", templateParams);
    console.log(
      "XXXXXXXcalculatedPrice inside handle submit",
      calculatedPrice?.totalPriceGross
    );

    emailjs
      .send(
        "service_vxcsu4d",
        "template_b06txlt",
        templateParams,
        "P_0aHI8FhelwPjRN0"
      )
      .then((response) => {
        console.log("Email sent:", response);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Email failed to send:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="container-xl card">
          <div className="row">
            <div className="col-sm-2 col-3">
              <img
                src="../amate_logo.png"
                className="img-fluid pb-3 pt-3"
                alt="Amate_Logo"
              />
            </div>
            <div className="col-sm-10 col-9 align-self-center">
              <h1 className="">DELIVERY PRICE CALCULATOR</h1>
            </div>
            <hr className="" />
          </div>
          <div className="row gx-4">
            <div className="col-md-6 col-12">
              {/* Error message */}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <Form
                drinkPriceNet={drinkPriceNet}
                drinkSoldAmount={drinkSoldAmount}
                crateSoldAmount={crateSoldAmount}
                bottleReceivedAmount={bottleReceivedAmount}
                crateReceivedAmount={crateReceivedAmount}
                handleButtonClick={handleButtonClick}
                handleInputChange={handleInputChange}
              />

              <div className="row mb-3 text-center">
                {/* Display the calculated delivery gross price */}
                <div className="col">
                  <hr className="my-2 mb-3" />
                  <h2 className="fw-bold fs-5">Price (Net):</h2>
                  <h2>
                    {" "}
                    {(totalPriceNet ?? 0) > 0
                      ? `+${totalPriceNet.toFixed(2)}€`
                      : `${totalPriceNet.toFixed(2)}€`}
                  </h2>
                </div>

                {/* Display the calculated delivery net price */}
                <div className="col">
                  <hr className="my-2 mb-3" />
                  <h2 className="fw-bold fs-5">Price (Gross):</h2>
                  <h2>
                    {(totalPriceGross ?? 0) > 0
                      ? `+${totalPriceGross.toFixed(2)}€`
                      : `${totalPriceGross.toFixed(2)}€`}
                  </h2>
                </div>
              </div>
            </div>

            {/* Display price and calculation details */}
            <div className="col-md-6 col-12">
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
                            <th>Gross</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          <tr>
                            <th>Drink Subtotal</th>
                            <td>+{drinkSoldAmount}</td>
                            <td>+{(drinkPriceTotalNet ?? 0).toFixed(2)}€</td>
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
                                ? `+${totalPriceNet.toFixed(2)}€`
                                : `${totalPriceNet.toFixed(2)}€`}
                            </td>

                            <td>
                              {(totalPriceGross ?? 0) > 0
                                ? `+${totalPriceGross.toFixed(2)}€`
                                : `${totalPriceGross.toFixed(2)}€`}
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
                            <th>VAT</th>
                            <th>Net</th>
                            <th>Gross</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          <tr>
                            <th>Drink</th>
                            <td>{(vat ?? 0) * 100}%</td>
                            <td>{drinkPriceNet || 0}€</td>
                            <td>
                              {(
                                (drinkPriceNet ?? 0) *
                                (1 + (vat || 0))
                              ).toFixed(2)}
                              €
                            </td>
                          </tr>
                          <tr>
                            <th>Bottle</th>
                            <td>0%</td>
                            <td>{bottlePrice || 0}€</td>
                            <td>{bottlePrice || 0}€</td>
                          </tr>
                          <tr>
                            <th>Crate</th>
                            <td>0%</td>
                            <td>{cratePrice || 0}€</td>
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
                            <th>Gross</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          <tr>
                            <th>Sold</th>
                            <td>+{drinkSoldAmount}</td>
                            <td>+{(drinkPriceTotalNet ?? 0).toFixed(2)}€</td>
                            <td>+{(drinkPriceTotalGross ?? 0).toFixed(2)}€</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>+{drinkSoldAmount}</td>
                            <td>+{(drinkPriceTotalNet ?? 0).toFixed(2)}€</td>
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
                            <td>
                              -{(bottlePriceReceivedTotal ?? 0).toFixed(2)}€
                            </td>
                            <td>
                              -{(bottlePriceReceivedTotal ?? 0).toFixed(2)}€
                            </td>
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
                            <td>
                              -{(cratePriceReceivedTotal ?? 0).toFixed(2)}€
                            </td>
                            <td>
                              -{(cratePriceReceivedTotal ?? 0).toFixed(2)}€
                            </td>
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

              {/* Inputfield Send E-Mail */}
              <div className="mb-3">
                {!isSubmitted ? (
                  <div className="input-group input-group-lg mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Send via E-Mail"
                      aria-label="Send via E-Mail"
                      aria-describedby="button-addon2"
                    ></input>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      disabled={isLoading}
                      onClick={handleSubmit}
                    >
                      {isLoading ? "Sending..." : "Send"}
                    </button>
                  </div>
                ) : (
                  <div className="alert alert-success" role="alert">
                    E-Mail was successfully sent.
                  </div>
                )}
              </div>
              {/*  <Email /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
