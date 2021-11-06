import _ from "lodash";
import LazyLoad from 'react-lazy-load';
import { Tween, Timeline } from 'react-gsap';
import Lightbox from 'react-image-lightbox';
import React, { useRef, useState, useEffect } from 'react';
import { useMainContext } from '../../Context/Context.js';

function Showcase({ treasureData, isMobile }) {
    const { setSelectedTreasure } = useMainContext();
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [treasuresToShow, setTreasuresToShow] = useState(null);

    if (!treasuresToShow) {
        const filteredTreasures = _.chain(treasureData)
            .filter((treasure) => treasure.visible &&
                treasure.file !== "" &&
                treasure.file !== "bafkreifzao62rzi25uro4eyu7csr4v46pwi7ixslgra7wjol6l57v3oyea")
            .value();
        const shuffled = filteredTreasures.sort(() => 0.5 - Math.random());
        const selected = shuffled
            .slice(0, 10 < filteredTreasures.length ? 10 : filteredTreasures.length);
        setTreasuresToShow(selected);
    }

    let listUI = (treasuresToShow && treasuresToShow.length > 0) ? (treasuresToShow.map((treasure, index) => (
        <LazyLoad
            debounce={false}
            offset={100}
            overflow={true}
            className={isMobile ? "showcase-item-container-mobile" : ""}>
            <Timeline
                target={
                    <div className={isMobile ? "showcase-image-container-mobile" : "showcase-image-container-non-mobile"}>
                        <img src={"https://ipfs.io/ipfs/" + treasure.file}
                            className={isMobile ? "showcase-image-mobile" : "showcase-image-non-mobile"}
                            onClick={() => {
                                setPhotoIndex(index);
                                setIsOpen(true);
                            }
                            } />
                        <div className="show-location-button">
                            <a href="#"
                                onClick={() => { setSelectedTreasure(treasure); }}>Show Location</a>
                        </div>
                    </div>
                }>
                <Tween
                    staggerFrom={{ opacity: 0, y: '-20px' }}
                    staggerTo={{ opacity: 1, y: '0px' }}
                    stagger={0.12}
                    duration={1}
                    position="+=0" />
            </Timeline>
        </LazyLoad>))) : "";
    return (
        <div className={isMobile ? "showcase-container-mobile" : "showcase-container-non-mobile"}>
            <div className={isMobile ? "showcase-header-mobile" : ""}>
                {isMobile ? "Featured" : ""}
            </div>
            <div className={isMobile ? "showcase showcase-mobile" : "showcase showcase-non-mobile"}>
                {listUI}
                {isOpen && (
                    <Lightbox
                        mainSrc={"https://ipfs.io/ipfs/" + treasuresToShow[photoIndex].file}
                        nextSrc={"https://ipfs.io/ipfs/" + treasuresToShow[(photoIndex + 1) % treasuresToShow.length].file}
                        prevSrc={"https://ipfs.io/ipfs/" + treasuresToShow[(photoIndex + treasuresToShow.length - 1) % treasuresToShow.length].file}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((photoIndex + treasuresToShow.length - 1) % treasuresToShow.length)
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex + 1) % treasuresToShow.length)
                        }
                    />
                )}
            </div>
        </div>

    );
}

export default Showcase;