
import React from 'react';
import { Icon } from '@iconify/react';
import fireIcon from '@iconify/icons-emojione/fire';
import volcanoIcon from '@iconify/icons-emojione/volcano';
import stormIcon from '@iconify/icons-emojione/cloud-with-lightning-and-rain';
import iceIcon from '@iconify/icons-emojione/snowflake';

function LocationMarker({ lat, lng, onClick, id }) {
    let renderIcon = null;
    let renderColor = null;
    if (id === 1) {
        renderIcon = "emojione-monotone:new-button";
        renderColor = "red";
    } else if (id === 2) {
        renderIcon = "emojione:fire";
        renderColor = "#613";
    } else if (id === 3) {
        renderIcon = "oi:map-marker";
        renderColor = "#613";
    }

    return (
        <div onClick={onClick}>
            <Icon icon={renderIcon} color={renderColor} width="22" className="location-icon" />
        </div>
    );
}

export default LocationMarker;