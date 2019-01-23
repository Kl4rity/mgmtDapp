import React, { Component } from 'react';
import postDataServiceSingleton from '../../../services/postService';
import { Row, Input, Button } from 'react-materialize';
import './AddMemberForm.css';


export class AddMemberForm extends Component {
    constructor(props) {
        super(props);
        this.state = { emailInput: '' };
        this.sendAddMember = this.sendAddMember.bind(this);
        this.onEmailInputChange = this.onEmailInputChange.bind(this);
        this.postDataService = postDataServiceSingleton.getPostServiceInstance();
    }

    onEmailInputChange(event) {
        this.setState({ emailInput: event.target.value });
    }

    sendAddMember() {
        this.postDataService.postData('https://localhost:3001/organisation/add/', { organisationId: this.props.organisationId, email: this.state.emailInput });
        this.setState({ emailInput: '' });
    }

    render() {
        return (
            <div>
                <Row>
                    <Input type="email" value = {this.state.emailInput} onChange={this.onEmailInputChange} s={12} label="E-Mail"></Input>
                    <div className="add-member-form-button-right">
                        <Button onClick={this.sendAddMember}>Add</Button>
                    </div>
                </Row>
            </div>
        )
    }
}

export default AddMemberForm
