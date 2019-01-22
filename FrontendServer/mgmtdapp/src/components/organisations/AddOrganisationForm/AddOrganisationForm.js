import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import postDataServiceSingleton from '../../../services/postService';
import './AddOrganisationForm.css';


export class AddOrganisationForm extends Component {
    constructor(props){
        super(props);
        this.state = {nameInput : ''};
        this.sendCreateOrganisation = this.sendCreateOrganisation.bind(this);
        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.postDataService = postDataServiceSingleton.getPostServiceInstance();
    }

    onNameInputChange(event){
        this.setState({nameInput: event.target.value});
    }

    sendCreateOrganisation(){
        this.postDataService.postData('https://localhost:3001/organisation/create/', {organisationName: this.state.nameInput});
        this.setState({nameInput : ''});
    }

    render() {
        return (
            <div>
                <Row>
                    <Input type="text" value={this.state.nameInput} onChange={this.onNameInputChange} s={12} label="Name" />
                    <div className="add-organisations-form-button-right">
                        <Button onClick={this.sendCreateOrganisation}>Create</Button>
                    </div>
                </Row>
            </div>
        )
    }
}

export default AddOrganisationForm;
