import React from 'react';
import {
  Button,
  Jumbotron
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

interface WelcomeProps {
  isAuthenticated: boolean;
  authButtonMethod: any;
  user: any;
}

interface WelcomeState {
  isOpen: boolean;
}



function WelcomeContent(props: WelcomeProps) {
  const history = useHistory();
  // If authenticated, greet the user
  if (props.isAuthenticated) {
    const handleAddEmployeeOnClick = () => history.push('/addEmployee');
    const handleSearchEmployeeOnClick = () => history.push('/getEmployees');
    return (
      <div>
        <h4>Welcome {props.user.displayName}!</h4>
        <p>You can use following buttons to get things done. </p>
        <div style={{display: 'flex', justifyContent: 'left'}}>
          <Button color="primary" onClick={handleAddEmployeeOnClick} style={{margin:'5px'}}>Add Employee</Button>
          <Button color="primary" onClick={handleSearchEmployeeOnClick} style={{margin:'5px'}}>Get Employees</Button>
        </div>

      </div>
    );
  }

  // Not authenticated, present a sign in button
  return <Button color="primary" onClick={props.authButtonMethod}>Click here to sign in</Button>;
}

export default class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  render() {
    return (
      <Jumbotron>
        <h1>Employee Management System</h1>
        <p className="lead">
          This is a simple app that let users to save employee details into a database and retrive them.
        </p>
        <WelcomeContent
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          authButtonMethod={this.props.authButtonMethod} />
      </Jumbotron>
    );
  }
}