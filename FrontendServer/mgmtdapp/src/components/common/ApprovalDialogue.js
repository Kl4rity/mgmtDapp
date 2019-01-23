import React from 'react';
import { Modal, Button } from 'react-materialize';
import './ApprovalDialogue.css'

export default function ApprovalDialogue(props) {
    function onApprovalWrapper() {
        props.onApproval(...props.args);
    }
    return (
        <span>
            <Modal trigger={props.trigger} header='Are you sure?'>
                <div className="right-align">
                    <Button className="modal-close">No</Button>
                    <span className="mgmt-dialogue-spacer"></span>
                    <Button onClick={onApprovalWrapper}>Yes</Button>
                </div>
            </Modal>
        </span>
    )
}

