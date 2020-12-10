import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Dialog from './Dialog';
import * as style from '../style';
import { translate } from '../../../common/i18n';
import googleDrive from '../../../common/integrations/GoogleDrive';
import { showSpinnerInButton, removeSpinnerInButton } from '../../../common/utils/tools';
import { retornaValores, parseXMLTemplate } from '../../common/tools';

import {
    isMainBlock,
    save,
    disable,
    deleteBlocksLoadedBy,
    addLoadersFirst,
    cleanUpOnLoad,
    addDomAsBlock,
    backwardCompatibility,
    fixCollapsedBlocks,
    fixArgumentAttribute,
    removeUnavailableMarkets,
    strategyHasValidTradeTypeCategory,
    cleanBeforeExport,
    importFile,
    saveBeforeUnload,
    removeParam,
    updateRenamedFields,
    getPreviousStrat,
} from '../blockly/utils';

class LoadContent extends PureComponent {
    constructor() {
        super();
        this.state = { loadType: 'local' };
    }

    loadTemplateXML(key) {
        const valores = retornaValores(key);
        console.log(key, valores);
        const xml_text = parseXMLTemplate(key, valores);
        Blockly.Events.setGroup('reset');
        Blockly.mainWorkspace.clear();
        const xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
        Blockly.Events.setGroup(false);
    }

    onChange(event) {
        this.setState({ loadType: event.target.value });
    }

    submit() {
        const templates = ['one50', 'one60', 'one70', 'one80', '90auto'];
        const xml = this.state.loadType;
        console.log('key', xml);

        if (templates.indexOf(xml) >= 0) {
            this.loadTemplateXML(xml);
            this.props.closeDialog();
        }
    }

    render() {
        return (
            <form
                id="load-dialog"
                action="javascript:;" // eslint-disable-line no-script-url
                className="dialog-content"
                style={style.content}
                onSubmit={() => this.submit()}
            >
                <div className="center-text input-row">
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="load-local"
                            name="load-option"
                            value="one50"
                            defaultChecked={true}
                            onChange={e => this.onChange(e)}
                        />
                        <label htmlFor="load-local">One 50</label>
                    </span>
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="load-one60"
                            name="load-option"
                            value="one60"
                            onChange={e => this.onChange(e)}
                        />
                        <label htmlFor="load-one60">One 60</label>
                    </span>
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="load-one70"
                            name="load-option"
                            value="one70"
                            onChange={e => this.onChange(e)}
                        />
                        <label htmlFor="load-one70">One 70</label>
                    </span>
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="load-one80"
                            name="load-option"
                            value="one80"
                            onChange={e => this.onChange(e)}
                        />
                        <label htmlFor="load-one80">One 80</label>
                    </span>
                    <span className="integration-option">
                        <input
                            type="radio"
                            id="load-auto90"
                            name="load-option"
                            value="90auto"
                            onChange={e => this.onChange(e)}
                        />
                        <label htmlFor="load-auto90">Auto 90</label>
                    </span>
                </div>
                <div className="center-text input-row last">
                    <button
                        id="load-strategy"
                        type="submit"
                        ref={el => {
                            this.submitButton = el;
                        }}
                    >
                        {translate('Load')}
                    </button>
                </div>
            </form>
        );
    }

    static props = { closeDialog: PropTypes.func };
}

export default class LoadDialog extends Dialog {
    constructor() {
        const closeDialog = () => {
            this.close();
        };
        super('load-dialog', translate('Load blocks'), <LoadContent closeDialog={closeDialog} />, style.dialogLayout);
        this.registerCloseOnOtherDialog();
    }
}
