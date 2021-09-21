import React from "react";

import "@reach/combobox/styles.css";
import { MapComponent } from "./Components/map";

function resetHeight() {
  // reset the body height to that of the inner browser
  document.body.style.height = window.innerHeight + "px";
}
// reset the height whenever the window's resized
window.addEventListener("resize", resetHeight);
// called to initially set the height.
resetHeight();

export default function App() {
  return (
    <MapComponent />
  );
}