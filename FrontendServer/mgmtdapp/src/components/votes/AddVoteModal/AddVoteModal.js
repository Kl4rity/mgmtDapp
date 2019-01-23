import React, { Component } from 'react';
import { Modal, Button } from 'react-materialize';
import './AddVoteModal.css';
import AddVoteForm from '../AddVoteForm/AddVoteForm';
import roleUtils from '../../utils/roleUtils';

export default class AddVoteModal extends Component {
    constructor(props) {
        super(props);
        this.memberCanCreateNewVote = this.memberCanCreateNewVote.bind(this);
        this.displayAddVoteModal = this.displayAddVoteModal.bind(this);
    }

    memberCanCreateNewVote(user, memberList, rolesList) {
        let canCreateVote = false;
        let userRole = roleUtils.getRoleForUserInOrganisation(user, memberList, rolesList);
        if (!!userRole) {
            canCreateVote = userRole.permissions.vote.create;
        }
        return canCreateVote;
    }

    displayAddVoteModal() {
        let modal = null;
        if (this.memberCanCreateNewVote(this.props.user, this.props.memberList, this.props.roles)) {
            modal =
                <div>
                    <div className='mgmt-dapp-add-vote-modal-container'>
                        <Modal header='Add Vote' fixedFooter trigger={<Button className='mgmt-dapp-add-vote-modal'>Create A New Vote</Button>}>Createa a new vote by specifying it's name, providing a description and choosing an End-Date for the vote. <AddVoteForm organisationId={this.props.organisationId} /></Modal>
                    </div>
                </div>
        }
        return modal;
    }

    render() {
        return (
            this.displayAddVoteModal()
        )
    }
}