interface FormProps {
  drinkPriceNet: number | null;
  drinkSoldAmount: number | null;
  crateSoldAmount: number | null;
  bottleReceivedAmount: number | null;
  crateReceivedAmount: number | null;
  handleButtonClick: () => void;
  handleInputChange: (field: string, value: number | null) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const {
    drinkPriceNet,
    drinkSoldAmount,
    crateSoldAmount,
    bottleReceivedAmount,
    crateReceivedAmount,
    handleButtonClick,
    handleInputChange,
  } = props;
  return (
    <>
      {" "}
      <form className="">
        {/* Input for Drink Price */}
        <div className="input-group mb-3" data-test-id="drinkPriceNet">
          <div className="form-floating flex-grow-1">
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="drinkPriceNet"
              placeholder="Drink Price (Net - No VAT, No Sugar & Caffeine Tax)"
              value={drinkPriceNet !== null ? drinkPriceNet : ""}
              /* value={drinkPriceNet ?? ""} */
              onChange={(e) =>
                handleInputChange(
                  "drinkPriceNet",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />
            <label htmlFor="floatingInputGroup1">
              Drink Price (Net - No VAT, No Sugar & Caffeine Tax)
            </label>
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
                handleInputChange(
                  "drinkSoldAmount",
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
                handleInputChange(
                  "crateSoldAmount",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />
            <label htmlFor="floatingInputGroup1">Crate Sold Amount</label>
          </div>
          <span className="input-group-text">Pcs</span>
        </div>

        {/* Input for Number of Bottles Received */}
        <div className="input-group mb-3" data-test-id="bottleReceivedAmount">
          <div className="form-floating flex-grow-1">
            <input
              type="number"
              step="1"
              className="form-control"
              id="bottleReceivedAmount"
              placeholder="Bottle Received Amount"
              value={bottleReceivedAmount !== null ? bottleReceivedAmount : ""}
              onChange={(e) =>
                handleInputChange(
                  "bottleReceivedAmount",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />
            <label htmlFor="floatingInputGroup1">Bottle Received Amount</label>
          </div>
          <span className="input-group-text">Pcs</span>
        </div>

        {/* Input for Number of Crates Received */}
        <div className="input-group mb-3" data-test-id="crateReceivedAmount">
          <div className="form-floating flex-grow-1">
            <input
              type="number"
              step="1"
              className="form-control"
              id="crateReceivedAmount"
              placeholder="Crate Received Amount"
              value={crateReceivedAmount !== null ? crateReceivedAmount : ""}
              onChange={(e) =>
                handleInputChange(
                  "crateReceivedAmount",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />
            <label htmlFor="floatingInputGroup1">Crate Received Amount</label>
          </div>
          <span className="input-group-text">Pcs</span>
        </div>

        {/* Button to calculate delivery price */}
        <div className="d-grid mb-3">
          <button
            type="button"
            className="btn btn-lg btn-primary col-6 mx-auto"
            onClick={handleButtonClick}
            data-test-id="calculateButton"
          >
            Calculate
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
