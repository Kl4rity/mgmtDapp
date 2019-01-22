import React, { Component } from 'react';
import { Modal, Button } from 'react-materialize';
import './AddMemberModal.css';

export default class AddMemberModal extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className='mgmt-dapp-add-member-modal-container'>
                    <Modal header='Add Member' fixedFooter trigger={<Button className='mgmt-dapp-add-member-modal'>Add A New Member</Button>}>This is where the text for the Modal will reside.</Modal>
                </div>
            </div>
        )
    }
}