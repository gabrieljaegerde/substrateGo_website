import React, {useRef, useState, useEffect} from 'react';
//Main Context
import {useMainContext} from '../Context/Context';

function Search(props) {
    const {treasureData, setSelectedTreasure, setReRenderMarkers} = useMainContext();
    const searchBox = useRef();
    const optionBox = useRef();
    //Matching results
    const [matchTreasure, setMatchTreasure] = useState(treasureData);
    //Handle dropDown
    const [storeSelection, setStoreSelection] = useState("All");

    //Filter treasureData
    const filterTreasureData = treasureData => {
        //Spread operator so we don't overwrite Reference data
        let filteredEventData = [...treasureData];
        if(storeSelection !== "All"){
                filteredEventData = filteredEventData.filter(event => event.categories[0].title === storeSelection);
        }
        return filteredEventData;
    }

    const userSearch = (searchQuery, treasureData) => {
        let treasureMatch = [];
        let filterdTreasureData = filterTreasureData(treasureData);
        if(searchQuery.length > 0 && filterdTreasureData){
            for(const event in treasureData){
                let treasureName = filterdTreasureData[event].title.toLowerCase();
                if(treasureName.indexOf(searchQuery) !== -1){
                    treasureMatch.push(filterdTreasureData[event]);
                }
            }
            //If they have typed in something but it didn't match
            if(treasureMatch.length === 0){
                treasureMatch = [{title: "No Results!", categories: [{title:""}]}]
            }
            setMatchTreasure(treasureMatch);
        }else{
            setMatchTreasure(filterdTreasureData);
        }
    }

    //They have changed their filter option. We want the markers to change aswell
    useEffect(() => {
        //First we want to sort out the Markers
        let filterdTreasureData = filterTreasureData(treasureData);
        setReRenderMarkers(filterdTreasureData);
        //Now we want to sort out the search results
        userSearch(searchBox.current.value.toLowerCase(), filterdTreasureData);
    }, [storeSelection])
    


    return (
        <>
            <section className="option-container">
            <p>Type:</p>
            <select ref={optionBox}
            onChange={() => {setStoreSelection(optionBox.current.value)
                }}>
                <option value="All">All</option>
                <option value="Wildfires">Wildfires</option>
                <option value="Severe Storms">Severe Storms</option>
                <option value="Volcanoes">Volcanoes</option>
                <option value="Sea and Lake Ice">Sea and Lake Ice</option>
            </select>
            </section>
            <section className="search-container">
                <p>Search:</p>
                <input type="text" onKeyUp={() => {
                    let searchQuery = searchBox.current.value.toLowerCase();
                    //Want to wait for the user to finish typing before sending method
                    setTimeout(() => {
                        if(searchQuery === searchBox.current.value.toLowerCase()){
                            userSearch(searchQuery, treasureData);
                        }
                    }, 300)

                }
                } ref={searchBox} />
            </section>

            <table className="search-table">
                <tr>
                    <th style={{width: "60%"}}>Title</th>
                    <th >Type</th>
                    <th>Location</th>
                </tr>
                {matchTreasure.map(tr => {
                    let count = 1;
                    return(<tr key={count++}>
                        <td>{tr.name}</td>
                        <td>{tr.name}</td>
                        {tr.name ? <td><a href="#" 
                        onClick={() => {setSelectedTreasure(tr)}}>Click Here</a></td> : <td></td>}
                    </tr>)
                })}
            </table>
        </>
    );
}

export default Search;