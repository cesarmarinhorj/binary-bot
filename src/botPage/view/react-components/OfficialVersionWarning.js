import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import * as style from '../style';

const OfficialVersionWarning = ({ show }) =>
    show ? (
        <div style={style.bottomWarning}>
            <div id="end-note">Desenvolvido por Mbmaciel.com</div>
        </div>
    ) : null;

OfficialVersionWarning.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default OfficialVersionWarning;
