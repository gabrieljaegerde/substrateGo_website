import React from 'react';
import { Icon } from '@iconify/react';

function LocationInfoBox({ info }) {
    return (
        <div className="location-info">
            <h2>{info.name}</h2>
            <ul>
                <li><Icon icon="emojione-monotone:id-button" color="black" className="listIcon" />
                    <strong>{info.id}</strong>
                </li>
                <li><Icon icon="noto:artist" color="black" className="listIcon" />
                    <strong>{info.creator}</strong>
                </li>
                <li>Collected <strong>{info.noCollected}</strong> time(s).</li>
                <li>Hint: <strong>{info.hint}</strong></li>
            </ul>
        </div>
    );
}

export default LocationInfoBox;