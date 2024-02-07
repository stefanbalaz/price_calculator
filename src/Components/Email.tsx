/* import { useState } from "react";
import emailjs from "emailjs-com";

function Email() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const templateParams = {
      forename: e.target.forename.value,
      surname: e.target.surname.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    emailjs
      .send(
        "service_vxcsu4d",
        "template_8iae8tg",
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
      <div className="input-group input-group-lg mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Send via E-Mail"
          aria-label="Send via E-Mail"
          aria-describedby="button-addon2"
        ></input>
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Send
        </button>
      </div>
    </>
  );
}

export default Email;
 */
