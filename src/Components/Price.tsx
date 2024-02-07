interface PriceProps {
  totalPriceNet: number;
  totalPriceGross: number;
}

const Price: React.FC<PriceProps> = (props) => {
  const { totalPriceNet, totalPriceGross } = props;

  return (
    <>
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
    </>
  );
};

export default Price;
