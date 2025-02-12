import { useState } from "react";

export default function UseOnline() {
  const [status, setStatus] = useState(true);

  window.addEventListener("online", () => {
    setStatus(true);
  });
  window.addEventListener("offline", () => {
    setStatus(false);
  });

  return status;
}
