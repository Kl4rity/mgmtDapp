import React from 'react';
import { Modal, Button } from 'react-materialize';

export default function ApprovalDialogue(props) {
    function onApprovalWrapper(){
        props.onApproval(...props.args);
    }
  return (
    <span>
        <Modal trigger={props.trigger} header='Are you sure?'>
            <Button onClick={onApprovalWrapper}>Yes</Button>
            <Button className="modal-close">No</Button>
        </Modal>
      </span>
  )
}

