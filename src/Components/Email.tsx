import { useState } from "react";

interface EMailProps {
  isLoading: boolean;
  isSubmitted: boolean;
  /*   handleSubmit: React.MouseEventHandler<HTMLButtonElement>; */
  handleSubmit: (email: string) => void;
}

const Email: React.FC<EMailProps> = (props) => {
  const { isLoading, handleSubmit, isSubmitted } = props;
  const [email, setEmail] = useState<string>("");

  return (
    <>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={isLoading}
              /*  onClick={() => handleSubmit(email)} */
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(email);
              }}
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
    </>
  );
};

export default Email;
