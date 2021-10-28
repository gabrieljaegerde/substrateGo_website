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