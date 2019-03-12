import React,{Component} from 'react';
import Axios from 'axios';
import {Table } from 'react-bootstrap';
import {Users} from '../components'


class ViewAllUsers extends Component {
    constructor(props) {
      super(props);
      this.state={
          message:'',
          users:[]
      }        
      const data={};
      Axios.post('//localhost:3000/api/admin/ViewAllUsers',data)
      .then(response=>{
          if (response.data.success){
              this.setState({users:response.data.users});
          }else {
              this.setState({message: response.data.msg })
              
          }
      });
  }
  

  deleteUser=(id) => {
    let {users}=this.state;
    users=users.filter(user=> {
        return user['_id']!==id
    })
    this.setState({users});
  }

  render () {
  
      let {users}=this.state;
  
          return <Table striped bordered hover responsive>
          <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Sex</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
              {
                 users.map(u=> {
                   return <Users u={u} deleteUser={this.deleteUser}/>
              
                 })
          }
            </tbody>
          </Table>
  }
  }
  
  export {ViewAllUsers};