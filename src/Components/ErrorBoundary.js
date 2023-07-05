import { useState, useEffect } from "react";

const ErrorBoundary = ({ errorInfo, isError, children }) => {
  const [hasError, setHasError] = useState(isError);

  useEffect(() => {
    return () => {
      setHasError(false);
    };
  }, []);

  const componentDidCatch = () => {
    setHasError(true);
  };

  if (hasError) {
    return <h1 onLoad={componentDidCatch}>{errorInfo}</h1>;
  }

  return children;
};

export default ErrorBoundary;
