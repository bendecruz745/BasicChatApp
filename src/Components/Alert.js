import { Alert } from "react-bootstrap";

function AlertBox({ variant, text }) {
  return (
    <Alert key={variant} variant={variant}>
      {text}
    </Alert>
  );
}

export default AlertBox;
