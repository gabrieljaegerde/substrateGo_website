
import React from 'react';
import {Icon} from '@iconify/react';
import blueCircle from '@iconify/icons-twemoji/blue-circle';

function LocationMarker({lat, lng}) {
    return (
        <div className="user-position">
            <Icon icon={blueCircle} color="#562" width="14" />
        </div>
    );
}

export default LocationMarker;