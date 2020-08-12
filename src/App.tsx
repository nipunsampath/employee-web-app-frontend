import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './NavBar';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.css';
import withAuthProvider, { AuthComponentProps } from './AuthProvider';
import AddEmployee from './AddEmployee';
import GetEmployees from './GetEmployees';
import { Helmet } from 'react-helmet';

const Title = "Employee Management App";

class App extends Component<AuthComponentProps> {
  render() {
    let error = null;
    if (this.props.error) {
      error = <ErrorMessage
        message={this.props.error.message}
        debug={this.props.error.debug} />;
    }

    return (

      <Router>
        <Helmet>
          <title>{Title}</title>
        </Helmet>
        <div>
          <NavBar
            isAuthenticated={this.props.isAuthenticated}
            authButtonMethod={this.props.isAuthenticated ? this.props.logout : this.props.login}
            user={this.props.user} />
          <Container>
            {error}
            <Route exact path="/"
              render={(props) =>
                <Welcome {...props}
                  isAuthenticated={this.props.isAuthenticated}
                  user={this.props.user}
                  authButtonMethod={this.props.login} />
              } />
            <Route exact path="/addEmployee"
              render={(props) =>
                this.props.isAuthenticated ?
                  <AddEmployee {...props} /> :
                  <Redirect to="/" />
              } />
            <Route exact path="/getEmployees"
              render={(props) =>
                this.props.isAuthenticated ?
                  <GetEmployees {...props} /> :
                  <Redirect to="/" />
              } />
          </Container>
        </div>
      </Router>
    );
  }
}

export default withAuthProvider(App);