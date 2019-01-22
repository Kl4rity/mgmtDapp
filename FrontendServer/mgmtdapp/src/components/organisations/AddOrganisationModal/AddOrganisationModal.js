import React, { Component } from 'react';
import { Modal, Button } from 'react-materialize';
import AddOrganisationForm from '../AddOrganisationForm/AddOrganisationForm';
import './AddOrganisationModal.css';

export default class AddOrganisationModal extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <li>
                <Modal header='Add Organisation' action={null} trigger={<Button className='mgmt-dapp-add-organisation-modal'>Create Organisation</Button>}>Choose a name for your new organisation.<AddOrganisationForm/></Modal>
            </li>
        )
    }
}
