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

    onChange(event) {
        this.setState({ loadType: event.target.value });
    }

    submit() {
        if (this.state.loadType === 'one50') {
            importFile('xml/One50.xml').then(dom => {
                Blockly.Events.setGroup('reset');
                Blockly.mainWorkspace.clear();
                Blockly.Xml.domToWorkspace(dom.getElementsByTagName('xml')[0], Blockly.mainWorkspace);
                Blockly.Events.setGroup(false);
                // this.cleanUp();
            });
        }
        if (this.state.loadType === 'one60') {
            importFile('xml/One60.xml').then(dom => {
                Blockly.Events.setGroup('reset');
                Blockly.mainWorkspace.clear();
                Blockly.Xml.domToWorkspace(dom.getElementsByTagName('xml')[0], Blockly.mainWorkspace);
                Blockly.Events.setGroup(false);
                // this.cleanUp();
            });
        }

        if (this.state.loadType === 'one70') {
            importFile('xml/One70.xml').then(dom => {
                Blockly.Events.setGroup('reset');
                Blockly.mainWorkspace.clear();
                Blockly.Xml.domToWorkspace(dom.getElementsByTagName('xml')[0], Blockly.mainWorkspace);
                Blockly.Events.setGroup(false);
                // this.cleanUp();
            });
        }

        if (this.state.loadType === 'one80') {
            importFile('xml/One80.xml').then(dom => {
                Blockly.Events.setGroup('reset');
                Blockly.mainWorkspace.clear();
                Blockly.Xml.domToWorkspace(dom.getElementsByTagName('xml')[0], Blockly.mainWorkspace);
                Blockly.Events.setGroup(false);
                // this.cleanUp();
            });
        } else {
            const valores = retornaValores();
            console.log(valores);
            const xml_text = parseXMLTemplate('90auto', valores);
            Blockly.Events.setGroup('reset');
            Blockly.mainWorkspace.clear();
            // var xml_text = "<xml xmlns=\"http://www.w4.org/1999/xhtml\" collection=\"true\">  <block type=\"tradeOptions\" id=\"x=V33~4Lb|(sLv`J[:Eb\"> <field name=\"DURATIONTYPE_LIST\">t</field> <field name=\"CURRENCY_LIST\">USD</field>  <field name=\"BARRIEROFFSETTYPE_LIST\">+</field>  <field name=\"SECONDBARRIEROFFSETTYPE_LIST\">-</field> <value name=\"DURATION\"> <shadow type=\"math_number\" id=\"C8^eV9KSC*eI/Hl^*{NZ\">  <field name=\"NUM\">1</field> </shadow> </value> <value name=\"AMOUNT\"><shadow type=\"math_number\" id=\"ml)25~7^q}3I9}vjf:%K\">  <field name=\"NUM\">1</field>  </shadow>  </value>    </block> </xml>";
            const xml = Blockly.Xml.textToDom(xml_text);
            Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
            Blockly.Events.setGroup(false);

            this.props.closeDialog();
            /*
            $('#files').click();
            this.props.closeDialog();
            */
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
