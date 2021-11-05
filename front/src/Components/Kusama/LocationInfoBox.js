import React from 'react';
import { Icon } from '@iconify/react';
import {
    WhatsappShareButton,
    TelegramShareButton,
    WhatsappIcon,
    TelegramIcon
} from "react-share";

function LocationInfoBox({ info, setLocationInfo }) {
    const url = info.visible ? info.file : "https://t.me/kusamaGo_bot";
    const title = `Let's collect this NFT treasure together!\n\n` +
        `Location (lng, lat): ${info.longitude}, ${info.latitude}` +
        `${info.file !== "" ? "\n" + info.file : ""}`
    return (
        <div className="location-info">
            <Icon icon="maki:cross" color="black" className="close-icon" onClick={() => setLocationInfo(null)} />
            <h2>{info.name}</h2>
            <ul>
                <li><Icon icon="emojione-monotone:id-button" color="black" className="list-icon" />
                    <strong>{info.id}</strong>
                </li>
                <li><Icon icon="noto:artist" color="black" className="list-icon" />
                    <strong>{info.creator}</strong>
                </li>
                <li>Collected <strong>{info.noCollected}</strong> time(s).</li>
                <li>Hint: <strong>{info.hint}</strong></li>
                <li><Icon icon="oi:map-marker" color="black" className="list-icon" />
                    <strong>{info.longitude}</strong>, <strong>{info.latitude} (Lng, Lat)</strong>
                </li>
                <li>
                    <TelegramShareButton
                        url={url}
                        title={title}
                        className=""
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>

                    <WhatsappShareButton
                        url={url}
                        title={title}
                        separator=""
                        className=""
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </li>
            </ul>
        </div>
    );
}

export default LocationInfoBox;;