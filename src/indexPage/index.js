import React from 'react';
import ReactDOM from 'react-dom';
import endpoint from './endpoint';
import { login } from './login';
import Logo from './react-components/logo.jsx';
import Footer from './react-components/footer.jsx';
import { oauthLogin } from '../common/appId';
import { isEuCountry, showHideEuElements } from '../common/footer-checks';
import GTM from '../common/gtm';
import { load as loadLang } from '../common/lang';
import { getTokenList } from '../common/utils/storageManager';
import { createUrl } from '../common/utils/tools';
import '../common/binary-ui/dropdown';

const renderElements = () => {
    if (!document.location.href.match(/login\.html$/)) {
        ReactDOM.render(<Logo />, document.getElementById('binary-logo'));
        ReactDOM.render(<Footer />, document.getElementById('footer'));
    }

    isEuCountry().then(isEu => showHideEuElements(isEu));
    $('#shop-url').attr('href', createUrl({ subdomain: 'shop', path: 'collections/strategies', isNonBotPage: true }));
};

const loginCheck = () => {
    if (endpoint()) return;
    if (getTokenList().length) {
        window.location.pathname = `${window.location.pathname.replace(/\/+$/, '')}/bot.html`;
    } else {
        loadLang();
        oauthLogin(() => {
            $('.show-on-load').show();
            $('.barspinner').hide();
            renderElements();
            GTM.init();
        });
    }
};

// login();
loginCheck();
