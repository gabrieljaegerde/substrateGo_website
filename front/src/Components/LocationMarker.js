
import React from 'react';
import { Icon } from '@iconify/react';

function LocationMarker({ lat, lng, onClick, id }) {
    let renderIcon = null;
    let renderColor = null;
    if (id === 1) {
        renderIcon = "emojione-monotone:new-button";
        renderColor = "red";
    } else if (id === 2) {
        renderIcon = "emojione:fire";
        renderColor = "red";
    } else if (id === 3) {
        renderIcon = "oi:map-marker";
        renderColor = "black";
    }

    return (
        <div onClick={onClick}>
            <Icon icon={renderIcon} color={renderColor} width="22" className="location-icon" />
        </div>
    );
}

export default LocationMarker;