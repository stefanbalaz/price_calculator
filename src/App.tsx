import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap";
import Email from "./Components/Email";
import Form from "./Components/Form";
import Header from "./Components/Header";
import Price from "./Components/Price";
import emailjs from "@emailjs/browser";
import ErrorMessage from "./Components/ErrorMessage";
import Accordion from "./Components/Accordion";
import { calculatePrice } from "./services/calculatePrice";

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

  useEffect(() => {
    const updatedCalculatedPrice = calculatePrice(
      drinkPriceNet,
      drinkSoldAmount,
      crateSoldAmount,
      bottleReceivedAmount,
      crateReceivedAmount,
      vat,
      bottlePrice,
      cratePrice
    );
    setCalculatedPrice(updatedCalculatedPrice);
  }, [
    drinkSoldAmount,
    crateSoldAmount,
    bottleReceivedAmount,
    crateReceivedAmount,
    vat,
    bottlePrice,
    cratePrice,
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
    const updatedCalculatedPrice = calculatePrice(
      drinkPriceNet,
      drinkSoldAmount,
      crateSoldAmount,
      bottleReceivedAmount,
      crateReceivedAmount,
      vat,
      bottlePrice,
      cratePrice
    );
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

  const handleSubmit: (email: string) => void = (email) => {
    setIsLoading(true);

    console.log("Email submitted:", email);

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
      email: email,
    };

    console.log("TemplateParams inside handle submit", templateParams);
    console.log(
      "CalculatedPrice inside handle submit",
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
          <Header />
          <div className="row gx-4">
            <div className="col-md-6 col-12">
              {/* Error message */}
              <ErrorMessage errorMessage={errorMessage} />

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

              {/* Display net and gross prices */}
              <Price
                totalPriceNet={totalPriceNet}
                totalPriceGross={totalPriceGross}
              />
            </div>

            {/* Display price and calculation details */}
            <div className="col-md-6 col-12">
              <Accordion
                drinkSoldAmount={drinkSoldAmount}
                drinkPriceTotalNet={drinkPriceTotalNet}
                drinkPriceTotalGross={drinkPriceTotalGross}
                bottleAmountSubtotal={bottleAmountSubtotal}
                bottlePriceSubtotal={bottlePriceSubtotal}
                crateAmountSubtotal={crateAmountSubtotal}
                cratePriceSubtotal={cratePriceSubtotal}
                totalPriceNet={totalPriceNet}
                totalPriceGross={totalPriceGross}
                vat={vat}
                drinkPriceNet={drinkPriceNet}
                bottlePrice={bottlePrice}
                cratePrice={cratePrice}
                bottlePriceSoldTotal={bottlePriceSoldTotal}
                bottleReceivedAmount={bottleReceivedAmount}
                bottlePriceReceivedTotal={bottlePriceReceivedTotal}
                crateSoldAmount={crateSoldAmount}
                cratePriceSoldTotal={cratePriceSoldTotal}
                crateReceivedAmount={crateReceivedAmount}
                cratePriceReceivedTotal={cratePriceReceivedTotal}
              />

              {/* Send E-Mail */}
              <Email
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                isSubmitted={isSubmitted}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
