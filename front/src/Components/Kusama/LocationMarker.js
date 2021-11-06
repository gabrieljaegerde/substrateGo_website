
import React from 'react';
import { Icon } from '@iconify/react';

function LocationMarker({ lat, lng, onClick, id }) {
    let renderIcon = null;
    let renderColor = null;
    let className = null;
    if (id === 1) {
        renderIcon = "emojione-monotone:new-button";
        renderColor = "red";
        className = "location-icon location-icon-new"
    } else if (id === 2) {
        renderIcon = "emojione:fire";
        renderColor = "red";
        className = "location-icon"
    } else if (id === 3) {
        renderIcon = "oi:map-marker";
        renderColor = "black";
        className = "location-icon"
    }

    return (
        <div onClick={onClick}>
            <Icon icon={renderIcon} color={renderColor} className={className} />
        </div>
    );
}

export default LocationMarker;