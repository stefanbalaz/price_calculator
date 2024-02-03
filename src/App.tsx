import { useState } from "react";
import "./App.css";
import "bootstrap";

function App() {
  const [drinkPrice, setDrinkPrice] = useState<number | null>(0.75);
  const [bottlePrice] = useState<number | null>(0.13);
  const [cratePrice] = useState<number | null>(1.66);
  const [vat] = useState<number | null>(0.2);
  const [drinkSoldAmount, setDrinkSoldAmount] = useState<number | null>(null);
  const [crateSoldAmount, setCrateSoldAmount] = useState<number | null>(null);
  const [bottleReceivedAmount, setBottleReceivedAmount] = useState<
    number | null
  >(null);
  const [crateReceivedAmount, setCrateReceivedAmount] = useState<number | null>(
    null
  );
  // const [totalPriceNet, setTotalPriceNet] = useState<number>(0);
  const [totalPriceGross, setTotalPriceGross] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function calculatePrice(): {
    totalPriceNet: number;
    totalPriceGross: number;
  } {
    const vatMultiplier = vat !== null ? 1 + vat : 1;

    const drinkPriceTotalNet = (drinkSoldAmount || 0) * (drinkPrice || 0);
    const drinkPriceTotalGross =
      (drinkSoldAmount || 0) * (drinkPrice || 0) * vatMultiplier;
    const bottlePriceReceivedTotal =
      (bottleReceivedAmount || 0) * (drinkPrice || 0);
    const cratePriceReceivedTotal =
      (crateReceivedAmount || 0) * (cratePrice || 0);

    const totalPriceNet =
      drinkPriceTotalNet +
      (drinkSoldAmount || 0) * (bottlePrice || 0) -
      (bottleReceivedAmount || 0) * (bottlePrice || 0) +
      (crateSoldAmount || 0) * (cratePrice || 0) -
      cratePriceReceivedTotal;

    const totalPriceGross =
      drinkPriceTotalGross +
      (drinkSoldAmount || 0) * (bottlePrice || 0) -
      bottlePriceReceivedTotal +
      (crateSoldAmount || 0) * (cratePrice || 0) -
      cratePriceReceivedTotal;

    return { totalPriceNet, totalPriceGross };
  }

  function handleButtonClick(): void {
    if (
      !drinkPrice ||
      drinkSoldAmount === null ||
      crateSoldAmount === null ||
      bottleReceivedAmount === null ||
      crateReceivedAmount === null ||
      drinkSoldAmount <= 0 ||
      crateSoldAmount <= 0 ||
      bottleReceivedAmount <= 0 ||
      crateReceivedAmount <= 0
    ) {
      setErrorMessage("Please fill out all fields with values greater than 0.");
      setTotalPriceGross(0);
      console.error("Validation error.");
      return;
    }

    const calculatedPrice = calculatePrice();

    setErrorMessage(null);
    setTotalPriceGross(calculatedPrice.totalPriceGross);
    // setTotalPriceNet(calculatedPrice.totalPriceNet);
  }

  return (
    <>
      <div className="main-container">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card p-4 col-lg-4 col-md-6 col-sm-12">
            <div className="d-flex flex-column align-items-center mb-3 fw-bold">
              <img src="../amate_logo.png" alt="Amate_Logo" />
              <hr className="my-2 w-100 mb-4" />
              <h1 className="fw-bold fs-5">PRICE CALCULATOR</h1>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <form>
              {/* Input for Drink Price */}
              <div className="input-group mb-3" data-test-id="drinkPrice">
                <div className="form-floating flex-grow-1">
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="drinkPrice"
                    placeholder="Drink Price (Net)"
                    value={drinkPrice !== null ? drinkPrice : ""}
                    onChange={(e) =>
                      setDrinkPrice(
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                  />
                  <label htmlFor="floatingInputGroup1">Drink Price (Net)</label>
                </div>
                <span className="input-group-text">€</span>
              </div>

              {/* Input for Number of Drinks Sold */}
              <div className="input-group mb-3" data-test-id="drinkSoldAmount">
                <div className="form-floating flex-grow-1">
                  <input
                    type="number"
                    step="1"
                    className="form-control"
                    id="drinkSoldAmount"
                    placeholder="Drink Sold Amount"
                    value={drinkSoldAmount !== null ? drinkSoldAmount : ""}
                    onChange={(e) =>
                      setDrinkSoldAmount(
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                  />
                  <label htmlFor="floatingInputGroup1">Drink Sold Amount</label>
                </div>
                <span className="input-group-text">Pcs</span>
              </div>

              {/* Input for Number of Crates Sold */}
              <div className="input-group mb-3" data-test-id="crateSoldAmount">
                <div className="form-floating flex-grow-1">
                  <input
                    type="number"
                    step="1"
                    className="form-control"
                    id="crateSoldAmount"
                    placeholder="Crate Sold Amount"
                    value={crateSoldAmount !== null ? crateSoldAmount : ""}
                    onChange={(e) =>
                      setCrateSoldAmount(
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                  />
                  <label htmlFor="floatingInputGroup1">Crate Sold Amount</label>
                </div>
                <span className="input-group-text">Pcs</span>
              </div>

              {/* Input for Number of Bottles Received */}
              <div
                className="input-group mb-3"
                data-test-id="bottleReceivedAmount"
              >
                <div className="form-floating flex-grow-1">
                  <input
                    type="number"
                    step="1"
                    className="form-control"
                    id="bottleReceivedAmount"
                    placeholder="Bottle Received Amount"
                    value={
                      bottleReceivedAmount !== null ? bottleReceivedAmount : ""
                    }
                    onChange={(e) =>
                      setBottleReceivedAmount(
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                  />
                  <label htmlFor="floatingInputGroup1">
                    Bottle Received Amount
                  </label>
                </div>
                <span className="input-group-text">Pcs</span>
              </div>

              {/* Input for Number of Crates Received */}
              <div
                className="input-group mb-3"
                data-test-id="crateReceivedAmount"
              >
                <div className="form-floating flex-grow-1">
                  <input
                    type="number"
                    step="1"
                    className="form-control"
                    id="crateReceivedAmount"
                    placeholder="Crate Received Amount"
                    value={
                      crateReceivedAmount !== null ? crateReceivedAmount : ""
                    }
                    onChange={(e) =>
                      setCrateReceivedAmount(
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                  />
                  <label htmlFor="floatingInputGroup1">
                    Crate Received Amount
                  </label>
                </div>
                <span className="input-group-text">Pcs</span>
              </div>

              {/* Button to calculate delivery price */}
              <div className="d-flex justify-content-center mt-3">
                <button
                  type="button"
                  className="btn btn-info text-white fw-bold mb-3"
                  onClick={handleButtonClick}
                  data-test-id="calculateButton"
                >
                  Calculate
                </button>
              </div>
            </form>

            {/* Display the calculated delivery fee */}
            <div className="d-flex flex-column align-items-center fw-bold mb-3">
              <hr className="my-2 w-100 mb-3" />
              <h2 className="fw-bold fs-5">Price (Gross):</h2>
              <h2>{totalPriceGross.toFixed(2)}€</h2>
            </div>

            {/* Accordion */}
            <div className="accordion" id="accordionPriceDetailsWrapper">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Calculation Details
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionPriceDetailsWrapper"
                  style={{ overflow: "auto" }}
                >
                  <div className="accordion-body">
                    {/* Display the calculation details */}
                    <div className="d-flex flex-column align-items-center">
                      <div>
                        <div className="align-items-start fw-bold fs-4">
                          PRICE
                        </div>
                        <table className="table mb-4 text-left">
                          <thead>
                            <tr>
                              <th></th>
                              <th>VAT</th>
                              <th>Net</th>
                              <th>Gross</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Drink</th>
                              <td>{(vat ?? 0) * 100}%</td>
                              <td>{drinkPrice || 0}€</td>
                              <td>
                                {((drinkPrice ?? 0) * (1 + (vat || 0))).toFixed(
                                  2
                                )}
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

                      <div>
                        <div className="align-items-start fw-bold fs-4">
                          DRINK
                        </div>
                        <table className="table mb-4 text-left">
                          <thead>
                            <tr>
                              <th></th>
                              <th>#</th>
                              <th>Net</th>
                              <th>Gross</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Sold: </th>
                              <td>{drinkSoldAmount}</td>
                              <td>
                                +
                                {(
                                  (drinkSoldAmount ?? 0) * (drinkPrice || 0)
                                ).toFixed(2)}
                                €
                              </td>
                              <td>
                                +
                                {(
                                  (drinkSoldAmount ?? 0) *
                                  ((drinkPrice ?? 0) * (1 + (vat || 0)))
                                ).toFixed(2)}
                                €
                              </td>
                            </tr>
                            <tr>
                              <th>Total: </th>
                              <td></td>
                              <td></td>
                              <td>
                                +
                                {(
                                  (drinkSoldAmount ?? 0) *
                                  ((drinkPrice ?? 0) * (1 + (vat || 0)))
                                ).toFixed(2)}
                                €
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <div className="align-items-start fw-bold fs-4">
                          BOTTLE
                        </div>
                        <table className="table mb-4 text-left">
                          <thead>
                            <tr>
                              <th></th>
                              <th>#</th>
                              <th>Net</th>
                              <th>Gross</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Sold: </th>
                              <td>{drinkSoldAmount}</td>
                              <td>
                                +
                                {(
                                  (drinkSoldAmount ?? 0) * (bottlePrice || 0)
                                ).toFixed(2)}
                                €
                              </td>
                              <td>
                                +
                                {(
                                  (drinkSoldAmount ?? 0) * (bottlePrice ?? 0)
                                ).toFixed(2)}
                                €
                              </td>
                            </tr>
                            <tr>
                              <th>Received: </th>
                              <td>{bottleReceivedAmount}</td>
                              <td>
                                -
                                {(
                                  (bottleReceivedAmount ?? 0) *
                                  (bottlePrice || 0)
                                ).toFixed(2)}
                                €
                              </td>
                              <td>
                                -
                                {(
                                  (bottleReceivedAmount ?? 0) *
                                  (bottlePrice ?? 0)
                                ).toFixed(2)}
                                €
                              </td>
                            </tr>
                            <tr>
                              <th>Total: </th>
                              <td></td>
                              <td></td>
                              <td>
                                {(
                                  (drinkSoldAmount ?? 0) * (bottlePrice ?? 0) -
                                  (bottleReceivedAmount ?? 0) *
                                    (bottlePrice ?? 0)
                                ).toFixed(2)}
                                €
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <div className="align-items-start fw-bold fs-4">
                          CRATE
                        </div>
                        <table className="table mb-4 text-left">
                          <thead>
                            <tr>
                              <th></th>
                              <th>#</th>
                              <th>Net</th>
                              <th>Gross</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Sold: </th>
                              <td>{crateSoldAmount}</td>
                              <td>
                                +
                                {(
                                  (crateSoldAmount ?? 0) * (cratePrice || 0)
                                ).toFixed(2)}
                                €
                              </td>
                              <td>
                                +
                                {(
                                  (crateSoldAmount ?? 0) *
                                  ((cratePrice ?? 0) * (1 + (vat || 0)))
                                ).toFixed(2)}
                                €
                              </td>
                            </tr>
                            <tr>
                              <th>Received: </th>
                              <td>{crateReceivedAmount}</td>
                              <td>
                                -
                                {(
                                  (crateReceivedAmount ?? 0) * (cratePrice || 0)
                                ).toFixed(2)}
                                €
                              </td>
                              <td>
                                -
                                {(
                                  (crateReceivedAmount ?? 0) *
                                  ((cratePrice ?? 0) * (1 + (vat || 0)))
                                ).toFixed(2)}
                                €
                              </td>
                            </tr>
                            <tr>
                              <th>Total: </th>
                              <td></td>
                              <td></td>
                              <td>
                                {(
                                  Number(
                                    (
                                      (crateSoldAmount !== null &&
                                      crateSoldAmount !== undefined
                                        ? crateSoldAmount
                                        : 0) *
                                      (Number(
                                        cratePrice !== null ? cratePrice : 0
                                      ) *
                                        (1 + Number(vat !== null ? vat : 0)))
                                    ).toFixed(2)
                                  ) -
                                  Number(
                                    (
                                      (crateReceivedAmount !== null &&
                                      crateReceivedAmount !== undefined
                                        ? crateReceivedAmount
                                        : 0) *
                                      (Number(
                                        cratePrice !== null ? cratePrice : 0
                                      ) *
                                        (1 + Number(vat !== null ? vat : 0)))
                                    ).toFixed(2)
                                  )
                                ).toFixed(2)}
                                €
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
