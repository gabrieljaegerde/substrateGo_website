import { Icon } from '@iconify/react';

function Header({ isTabletOrMobile, treasureCount }) {
    return (
        <div className="header-bar">
            <img src="logo.jpeg" className="logo" alt="logo" />
            <span>KusamaGo {isTabletOrMobile ? "" : "- NFT Treasure Hunt"}</span>
            <span className="treasure-count">{treasureCount}
                <Icon icon="mdi:treasure-chest" color="black" width="22" className="treasure-icon" />
            </span>
        </div>
    );
}

export default Header;