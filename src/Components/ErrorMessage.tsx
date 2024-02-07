interface ErrorMessageProps {
  errorMessage: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { errorMessage } = props;
  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
