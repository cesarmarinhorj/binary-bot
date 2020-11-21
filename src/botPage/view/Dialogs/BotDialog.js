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
        const valores = retornaValores();
        console.log(valores);
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
        if (this.state.loadType === 'one50') {
            this.loadTemplateXML('one50');
            this.props.closeDialog();
            // importFile('xml/One50.xml').then(dom => {
            //     Blockly.Events.setGroup('reset');
            //     Blockly.mainWorkspace.clear();
            //     Blockly.Xml.domToWorkspace(dom.getElementsByTagName('xml')[0], Blockly.mainWorkspace);
            //     Blockly.Events.setGroup(false);
            //     // this.cleanUp();
            // });
        }
        if (this.state.loadType === 'one60') {
            this.loadTemplateXML('one60');
            this.props.closeDialog();
            // importFile('xml/One60.xml').then(dom => {
            //     Blockly.Events.setGroup('reset');
            //     Blockly.mainWorkspace.clear();
            //     Blockly.Xml.domToWorkspace(dom.getElementsByTagName('xml')[0], Blockly.mainWorkspace);
            //     Blockly.Events.setGroup(false);
            //     // this.cleanUp();
            // });
        }

        if (this.state.loadType === 'one70') {
            this.loadTemplateXML('one70');
            this.props.closeDialog();
            // importFile('xml/One70.xml').then(dom => {
            //     Blockly.Events.setGroup('reset');
            //     Blockly.mainWorkspace.clear();
            //     Blockly.Xml.domToWorkspace(dom.getElementsByTagName('xml')[0], Blockly.mainWorkspace);
            //     Blockly.Events.setGroup(false);
            //     // this.cleanUp();
            // });
        }

        if (this.state.loadType === 'one80') {
            this.loadTemplateXML('one80');
            this.props.closeDialog();
            // importFile('xml/One80.xml').then(dom => {
            //     Blockly.Events.setGroup('reset');
            //     Blockly.mainWorkspace.clear();
            //     Blockly.Xml.domToWorkspace(dom.getElementsByTagName('xml')[0], Blockly.mainWorkspace);
            //     Blockly.Events.setGroup(false);
            //     // this.cleanUp();
            // });
        } else {
            this.loadTemplateXML('90auto');
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
                            value="auto90"
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
