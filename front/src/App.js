import React from "react";

import "@reach/combobox/styles.css";
import { MapComponent } from "./Components/map";

function resetSize() {
  // reset the body height to that of the inner browser
  document.body.style.height = window.innerHeight + "px";
  document.body.style.width = window.innerWidth + "px";
}
// reset the height whenever the window's resized
window.addEventListener("resize", resetSize);
// called to initially set the height.
resetSize();

export default function App() {
  return (
    <MapComponent />
  );
}