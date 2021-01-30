import React from 'react';
import { createUrl } from '../../common/utils/tools';

const Logo = () => (
    <a href='http://onebotmembers.com' id="logo">
        <div className="logo-parent">
            <div className="binary-logo-text">
                <img className="responsive" src={'image/logo_main.png'} alt="Binary logo" />
            </div>
        </div>
    </a>
);
export default Logo;