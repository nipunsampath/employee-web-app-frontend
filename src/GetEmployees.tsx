import React from 'react';
import { Table } from 'reactstrap';
import withAuthProvider, { AuthComponentProps } from './AuthProvider';
import axios from 'axios';

const GET_EMPLOYEE_ENDPOINT = "https://employee-web-app.azurefd.net/employees";
// const GET_EMPLOYEE_ENDPOINT = "http://localhost:6000/employees";

interface GetEmployeeState {
  employees: JSON[];
  source: string;
}

class GetEmployees extends React.Component<AuthComponentProps, GetEmployeeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      employees: [],
      source: "",
    };

  }

  async componentDidMount() {
    try {
      const properties = { headers: { "Content-Type": "application/json" } };
      // fetching all employees
      axios.get(GET_EMPLOYEE_ENDPOINT, properties).then((response) => {
        var employee_data = response.data;
        console.log(response.status);
        this.setState({
          employees: employee_data['data'],
          source: employee_data['source']
        });
      }).catch((error) => {

        console.log(error);
      });
    }
    catch (err) {
      this.props.setError('ERROR', JSON.stringify(err));
    }
  }


  render() {
    let source = this.state.source;
    return (

      <div>
        <div>
          <h1>Employees</h1>

        </div>
        <Table>
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Employee Type</th>
              <th scope="col">Address</th>

            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(
              (employee: any) => {
                return (
                  <tr key={employee['id']}>
                    <td>{employee['FirstName']}</td>
                    <td>{employee['LastName']}</td>
                    <td>{employee['DOB']}</td>
                    <td>{employee['EmpType']}</td>
                    <td>{employee['Address']}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <p style={this.state.source === "" ? { display: 'none' } : {}}>Source: {source}</p>
      </div>

    )

  }
}

export default withAuthProvider(GetEmployees);