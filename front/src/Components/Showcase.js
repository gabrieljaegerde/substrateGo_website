import _ from "lodash";
import LazyLoad from 'react-lazy-load';
import { Tween, Timeline } from 'react-gsap';
import Lightbox from 'react-image-lightbox';
import React, { useRef, useState, useEffect } from 'react';

function Showcase({ treasureData, isMobile }) {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [treasureImages, setTreasureImages] = useState(null);
    
    if (!treasureImages) {
        const filteredTreasures = _.chain(treasureData)
            .filter((treasure) => treasure.visible &&
                treasure.file !== "" &&
                treasure.file !== "bafkreifzao62rzi25uro4eyu7csr4v46pwi7ixslgra7wjol6l57v3oyea")
            .value();
        const shuffled = filteredTreasures.sort(() => 0.5 - Math.random());
        const selected = shuffled
            .slice(0, 10 < filteredTreasures.length ? 10 : filteredTreasures.length);
        let treasureFiles = [];
        selected.map((treasure) => {
            treasureFiles.push("https://ipfs.io/ipfs/" + treasure.file);
        });
        setTreasureImages(treasureFiles);
    }

    let listUI = (treasureImages && treasureImages.length > 0) ? (treasureImages.map((image, index) => (
        <LazyLoad
            debounce={false}
            offset={100}
            overflow={true}
            className={isMobile ? "showcase-image-container-mobile" : ""}>
            <Timeline
                target={
                    <img src={image}
                        className={isMobile ? "showcase-image-mobile" : "showcase-image-non-mobile"}
                        onClick={() => {
                            console.log("index", index);
                            setPhotoIndex(index);
                            setIsOpen(true);
                        }
                        } />
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
                {isMobile ? "These are amongst them..." : ""}
            </div>
            <div className={isMobile ? "showcase showcase-mobile" : "showcase showcase-non-mobile"}>
                {listUI}
                {isOpen && (
                    <Lightbox
                        mainSrc={treasureImages[photoIndex]}
                        nextSrc={treasureImages[(photoIndex + 1) % treasureImages.length]}
                        prevSrc={treasureImages[(photoIndex + treasureImages.length - 1) % treasureImages.length]}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((photoIndex + treasureImages.length - 1) % treasureImages.length)
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex + 1) % treasureImages.length)
                        }
                    />
                )}
            </div>
        </div>

    );
}

export default Showcase;