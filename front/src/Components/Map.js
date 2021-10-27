import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import useSuperCluster from 'use-supercluster';
import React, { useRef, useState, useEffect } from 'react';
import LocationInfoBox from './LocationInfoBox';
//Main Context
import { useMainContext } from '../Context/Context';
import mapStyles from "../mapStyles";
import MediaQuery from 'react-responsive';
import { useMediaQuery } from 'react-responsive';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

function Map({ center, treasureData, isTabletOrMobile }) {
    const { selectedTreasure } = useMainContext();
    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    const mapRef = useRef();
    const [zoom, setZoom] = useState(1);
    const [bounds, setBounds] = useState(null);
    //Info Box
    const [locationInfo, setLocationInfo] = useState(null);

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        zoomControl: isTabletOrMobile ? false : true,
    };

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    //Index for reference
    const treasureDataIndex = {
        1: "New",
        2: "Popular",
        3: "Normal"
    };
    //Create an Array of its keys
    let treasureDataIndexNum = Object.keys(treasureDataIndex);
    treasureDataIndexNum = treasureDataIndexNum.map(index => Number(index));

    //Set up the geo-features. Do not need them anymore.
    const points = treasureData.map(treasure => ({
        type: "Feature",
        properties: {
            cluster: false,
            treasureId: treasure.id,
            treasureName: treasure.name,
            treasureCreator: treasure.creator,
            treasureNoCollected: treasure.noCollected,
            treasureType: treasure.new ? 1 : treasure.popular ? 2 : 3,
            treasureHint: treasure.hint
        },
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(treasure.location.longitude),
                parseFloat(treasure.location.latitude)
            ]
        }
    }));
    //Get clusters
    const { clusters, supercluster } = useSuperCluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 }
    });
    //User has clicked on searched link. They want to go to it
    useEffect(() => {
        if (selectedTreasure !== null) {
            let longitude = selectedTreasure.geometries[0].coordinates[0];
            let latitude = selectedTreasure.geometries[0].coordinates[1];
            mapRef.current.panTo({ lat: latitude, lng: longitude });
            mapRef.current.setZoom(10);
        }
    }, [selectedTreasure]);

    //<Search panTo={panTo} />

    return (
        <div className="map-container">
            <Locate panTo={panTo} />

            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                center={center}
                zoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                options={options}
                onGoogleApiLoaded={({ map }) => {
                    mapRef.current = map;
                }}
                onChange={({ zoom, bounds }) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ]);
                }}
                onDrag={() => setLocationInfo(null)}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const { cluster: isCluster, point_count: pointCount } = cluster.properties;
                    //Used for icon type
                    const clusterId = cluster.properties.treasureType;
                    if (isCluster) {
                        let changeSize = Math.round(pointCount / points.length * 100);
                        //Can't exceed 40 px
                        let addSize = Math.min(changeSize * 10, 40);
                        return (
                            <section key={cluster.id} lat={latitude} lng={longitude}>
                                <div className="cluster-marker" style={{
                                    width: `${addSize + changeSize}px`,
                                    height: `${addSize + changeSize}px`
                                }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        );
                                        mapRef.current.setZoom(expansionZoom);
                                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                                    }}>
                                    {pointCount}
                                </div>
                            </section>
                        );
                    }
                    //Not a cluster. Just a single point
                    if (treasureDataIndexNum.indexOf(clusterId) !== -1 && cluster.geometry.coordinates.length === 2) {
                        return <LocationMarker
                            lat={latitude}
                            lng={longitude}
                            id={clusterId}
                            key={cluster.properties.treasureId}
                            onClick={() => {
                                setLocationInfo({
                                    id: cluster.properties.treasureId,
                                    name: cluster.properties.treasureName,
                                    creator: cluster.properties.treasureCreator,
                                    noCollected: cluster.properties.treasureNoCollected,
                                    hint: cluster.properties.treasureHint
                                });
                            }} 
                        />;
                    }

                })
                }
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    );
}

function Locate({ panTo }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const { setUserPosition } = useMainContext();

    return (
        <button
            className={isTabletOrMobile ? "locate locate-bottom" : "locate locate-top"}
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img src="/compass.svg" alt="compass" />
        </button>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className="search">
            <Combobox
                onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

Map.defaultProps = {
    center: {
        lat: 29.305561,
        lng: -3.981108
    }};


export default Map;