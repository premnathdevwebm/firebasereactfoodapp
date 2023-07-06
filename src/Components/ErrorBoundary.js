const ErrorBoundary = ({ errorInfo, isError, closeError, children }) => {
  if (isError) {
    return (
      <>
        <div onClick={closeError}>X</div>
        <h1>{errorInfo}</h1>
      </>
    );
  }

  return children;
};

export default ErrorBoundary;
