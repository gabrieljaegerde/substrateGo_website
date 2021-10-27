import React from 'react';

function LocationInfoBox({info}) {
    return (
        <div className="location-info">
            <h2>{info.name}</h2>
            <ul>
                <li>ID: <strong>{info.id}</strong></li>
                <li>Creator: <strong>{info.creator}</strong></li>
                <li>Times collected: <strong>{info.noCollected}</strong></li>
            </ul>
        </div>
    );
}

export default LocationInfoBox;