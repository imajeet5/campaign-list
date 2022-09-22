import { StyleFullContainer } from './Spinner';

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <StyleFullContainer role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <p>Please Refresh and try again</p>
    </StyleFullContainer>
  );
};
