import KusamaHome from './Components/Kusama/Home.js';
import 'react-image-lightbox/style.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/">
            <KusamaHome />
          </Route>
          <Route path="/kusama">
            <KusamaHome />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;