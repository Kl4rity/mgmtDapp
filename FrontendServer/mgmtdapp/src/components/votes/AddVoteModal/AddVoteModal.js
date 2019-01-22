import React, { Component } from 'react';
import { Modal, Button } from 'react-materialize';
import './AddVoteModal.css';

export default class AddVoteModal extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className='mgmt-dapp-add-vote-modal-container'>
                    <Modal header='Add Vote' fixedFooter trigger={<Button className='mgmt-dapp-add-vote-modal'>Create A New Vote</Button>}>This is where the text for the Modal will reside.</Modal>
                </div>
            </div>
        )
    }
}