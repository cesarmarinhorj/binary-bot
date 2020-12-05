import React from 'react';
import { translate } from '../../../common/i18n';
import { iframe as iframeStyle } from '../style';
import Dialog from './Dialog';

const chartWidth = 700;
const chartHeight = 700;

function Video1Component() {
    return <iframe style={iframeStyle} src="https://www.youtube.com/embed/c4dEoHTXAPI" />;
}

export default class Video1 extends Dialog {
    constructor() {
        super('video1-dialog', translate('Video tutorial'), <Video1Component />, {
            width : chartWidth,
            height: chartHeight,
        });
    }
}
