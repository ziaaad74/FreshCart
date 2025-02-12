import UseOnline from "../../hooks/useOnline";

export default function Online({ children }) {
  let status = UseOnline();
  if (status) {
    return children;
  }
}
