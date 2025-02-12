import { Navigate } from "react-router-dom";
import { userContext } from "../../context/User.Context";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function GuestRoute({ children }) {
  let { token } = useContext(userContext);
  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
