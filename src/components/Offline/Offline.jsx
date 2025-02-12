import UseOnline from "../../hooks/useOnline";

export default function Offline({ children }) {
  let status = UseOnline();
  if (!status) {
    return children;
  }
}
