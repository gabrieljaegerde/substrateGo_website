import React, {useContext, useState} from 'react';

const mainContext = React.createContext();

export function useMainContext() {
    return useContext(mainContext);
}

export function ContextProvider({children}) {
    //All of the data
    const [treasureData, setTreasureData] = useState([]);
    //Used to store the treasure that the user wants to go to
    const [selectedTreasure, setSelectedTreasure] = useState(null);
    //Need to re-render markers because user has changed filer option
    const [reRenderMarkers, setReRenderMarkers] = useState(null);

    const value = {
        treasureData,
        setTreasureData,
        selectedTreasure,
        setSelectedTreasure,
        reRenderMarkers,
        setReRenderMarkers
    }

    return(
        <mainContext.Provider value={value}>
        {children}
        </mainContext.Provider>
    )
}