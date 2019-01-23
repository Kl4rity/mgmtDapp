import React, { Component } from 'react';
import postDataServiceSingleton from '../../../services/postService';
import { Row, Input, Button } from 'react-materialize';
import './AddVoteForm.css';


export class AddMemberForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            voteName: '',
            voteDescription : '',
            endDate : new Date()
         };
        this.sendCreateVote = this.sendCreateVote.bind(this);
        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.onDescriptionInputChange = this.onDescriptionInputChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.postDataService = postDataServiceSingleton.getPostServiceInstance();
    }

    onNameInputChange(event) {
        this.setState({ voteName: event.target.value });
    }

    onDescriptionInputChange(event) {
        this.setState({ voteDescription: event.target.value});
    }

    onEndDateChange(event){
        console.log(this.state);
        this.setState({ endDate: new Date(event.target.value)});
        console.log(new Date(this.state.endDate).getTime());
    }

    sendCreateVote() {
        this.postDataService.postData('https://localhost:3001/vote/create/', { organisationId: this.props.organisationId, name: this.state.voteName, description: this.state.voteDescription, endDate: new Date(this.state.endDate).getTime() });
        this.setState(
            { 
                voteName: '',
                voteDescription: '',
                endDate : new Date()
            });
    }

    render() {
        return (
            <div>
                <Row>
                    <Input type="text" value = {this.state.voteName} onChange={this.onNameInputChange} s={12} label="Name"></Input>
                    <Input type="textarea" value = {this.state.voteDescription} onChange={this.onDescriptionInputChange} s={12} label="Description"></Input>
                    <Input name='on' type='date' value = {new Date(this.state.endDate).toLocaleDateString('de-DE')} onChange={this.onEndDateChange} s={12} label = "End Date" />
                    <div className="add-member-form-button-right">
                        <Button onClick={this.sendCreateVote}>Create</Button>
                    </div>
                </Row>
            </div>
        )
    }
}

export default AddMemberForm
