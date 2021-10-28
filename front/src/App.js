import Map from './Components/Map.js';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import Loader from './Components/Loader.js';
import Search from './Components/Search.js';
import { useState, useEffect } from 'react';
//Main Context
import { useMainContext } from './Context/Context.js';
import treasureService from "./Services/Treasure.Service.js";
import { useMediaQuery } from 'react-responsive';

function App() {
  const { setTreasureData, reRenderMarkers } = useMainContext();
  const [loading, setLoading] = useState(false);
  //Treasure to render
  const [treasures, setTreasures] = useState([]);

  useEffect(() => {
    const fetchTreasures = async () => {
      setLoading(true);
      let res = await treasureService.getAll();
      setTreasures(res);
      //Treasure data is globally accessible. But 'treasures' is just to render out the MAP with the markers
      setTreasureData(res);
      setLoading(false);
    };
    fetchTreasures();
  }, []);

  useEffect(() => {
    if (reRenderMarkers !== null) {
      setTreasures(reRenderMarkers);
    }
  }, [reRenderMarkers]);

  function resetSize() {
    // reset the body height to that of the inner browser
    let vh = window.innerHeight * 0.01;
    //let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    //document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.body.style.height = window.innerHeight + "px";
    //document.body.style.width = window.innerWidth + "px";
    console.log("document.body.style.height", window.innerHeight)
    console.log("document.body.style.width", window.innerWidth)
  }

  // reset the height whenever the window's resized
  window.addEventListener("resize", resetSize);
  // called to initially set the height.
  resetSize();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return (
    <div>
      <Header isTabletOrMobile={isTabletOrMobile} treasureCount={treasures.length} />
      <Footer />
      {!loading ? <Map treasureData={treasures} isTabletOrMobile={isTabletOrMobile} /> : <Loader />}

    </div>
  );
}

export default App;