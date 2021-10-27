import Map from './Components/Map';
import Header from './Components/Header';
import Loader from './Components/Loader';
import Search from './Components/Search';
import { useState, useEffect } from 'react';
//Main Context
import { useMainContext } from './Context/Context'
import treasureService from "./Services/treasure.service";


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
    }
    fetchTreasures();
  }, [])

  useEffect(() => {
    if (reRenderMarkers !== null) {
      setTreasures(reRenderMarkers);
    }
  }, [reRenderMarkers])


  return (
    <div>
      <Header />
      {!loading ? <Map treasureData={treasures} /> : <Loader />}
    </div>
  );
}

export default App;