import React, { Component } from 'react';
import { Modal, Button } from 'react-materialize';
import './AddMemberModal.css';
import AddMemberForm from '../AddMemberForm/AddMemberForm';
import roleUtils from '../../utils/roleUtils';

export default class AddMemberModal extends Component {
    constructor(props) {
        super(props);
        this.memberCanAddMembers = this.memberCanAddMembers.bind(this);
        this.displayModal = this.displayModal.bind(this);
    }

    memberCanAddMembers(user, memberList, rolesList) {
        let canAddMemebers = false;
        let userRole = roleUtils.getRoleForUserInOrganisation(user, memberList, rolesList);
        if (!!userRole) {
            canAddMemebers = userRole.permissions.organisation.addMember;
        }
        return canAddMemebers;
    }

    displayModal() {
        let modal = null;
        if (this.memberCanAddMembers(this.props.user, this.props.memberList, this.props.roles)) {
            modal =
                <div>
                    <div className='mgmt-dapp-add-member-modal-container'>
                        <Modal header='Add Member' trigger={<Button className='mgmt-dapp-add-member-modal'>Add A New Member</Button>}>You can add a member to the organisation by submitting his E-Mail address here. Make sure he or she has an MGMT account. <AddMemberForm organisationId={this.props.organisationId} /></Modal>
                    </div>
                </div>
        }
        return modal;
    }

    render() {
        return (
            this.displayModal()
        )
    }
}