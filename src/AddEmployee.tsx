import React from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, Col, Row, FormText } from 'reactstrap';
import withAuthProvider, { AuthComponentProps } from './AuthProvider';
import axios from 'axios';


interface AddEmployeeState {
    fname: string;
    lname: string;
    dob: string;
    empCategory: string;
    hours: string;
    address: string;
    file:any;
}

class AddEmployee extends React.Component<AuthComponentProps, AddEmployeeState> {

    constructor(props: any) {
        super(props);

        this.state = {
            fname: "",
            lname: "",
            dob: "",
            empCategory: "Permanent",
            hours: "",
            address: "",
            file:null,
        };
    }

    async componentDidMount() {
        try {
            // Get the user's access token
            // var accessToken = await this.props.getAccessToken(config.scopes);
            // Get the user's events
            // var events = await getEvents(accessToken);
            // Update the array of events in state
            // this.setState({ events: events.value });
        }
        catch (err) {
            this.props.setError('ERROR', JSON.stringify(err));
        }
    }

    onFirstNameChange = (event: { target: { value: any; }; }) => {
        this.setState({ fname: event.target.value });
    }

    onLastNameChange = (event: { target: { value: any; }; }) => {
        this.setState({ lname: event.target.value });
    }

    onDOBChange = (event: { target: { value: any; }; }) => {
        this.setState({ dob: event.target.value });
    }

    onEmpCategoryChange = (event: { target: { value: any; }; }) => {
        this.setState({ empCategory: event.target.value });
    }

    onFileChange = (event: { target: { files: any; }; }) => {
        this.setState({ file: event.target.files[0] });
    }

    onAddressChange = (event: { target: { value: any; }; }) => {
        this.setState({ address: event.target.value });
    }

    onSubmit = (e: { preventDefault: () => void; }) => {
        const SAVE_EMPLOYEE_ENDPOINT = 'https://employee-main.azurewebsites.net/saveEmployee';
        // const SAVE_EMPLOYEE_ENDPOINT = 'http://localhost:5000/saveEmployee';

        e.preventDefault();
        // get our form data out of state
        const { fname, lname, dob, empCategory,address,file } = this.state;
        const properties = { headers: { "Content-Type": "multipart/form-data" } };
        
        const data = new FormData() 
        
        data.set('fname',fname);
        data.set('lname',lname);
        data.set('dob',dob);
        data.set('empType',empCategory);
        data.set('address',address);
        data.append('nic',file);
        console.log("sending req");
        axios.post(SAVE_EMPLOYEE_ENDPOINT, data,properties)
            .then((result) => {
                
                if (result.status === 200)
                    alert("Employee added!");
                else
                    alert("Could not add the employee!");
                window.location.reload(true);
            });
        console.log("sending req");
    }

    render() {
        const { fname, lname, dob, empCategory,address } = this.state;
        return (
            <Jumbotron>
                <Form onSubmit={this.onSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="firstNamelabel">First Name</Label>
                                <Input type="text" name="fname" placeholder="First Name" value={fname} onChange={this.onFirstNameChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="lastNamelabel">Last Name</Label>
                                <Input type="text" name="lname" placeholder="Last Name" value={lname}
                                    onChange={this.onLastNameChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="dobLabel">Date of Birth</Label>
                        <Input type="date" name="dob" id="dobID" value={dob} onChange={this.onDOBChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="empCategoryLabel">Employee Type</Label>
                        <Input type="select" name="empCategory" value={empCategory} onChange={this.onEmpCategoryChange}>
                            <option>Permanent</option>
                            <option>Contractor</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="NICImage">NIC</Label>
                        <Input type="file" name="nic" onChange={this.onFileChange} accept=".gif,.jpg,.jpeg,.png" />
                        <FormText color="muted">
                            Scanned copy of the National Identity Card.
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="addressLabel">Address</Label>
                        <Input type="textarea" name="address" value={address} onChange={this.onAddressChange} />
                    </FormGroup>
                    <Button color="primary" type="submit">Submit</Button>
                </Form >
            </Jumbotron>
        );
    }
}

export default withAuthProvider(AddEmployee);