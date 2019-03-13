import React,{Component} from 'react';
import Axios from 'axios';
import {Table } from 'react-bootstrap';
import {Users} from '../components'


class ViewAllUsers extends Component {
    constructor(props) {
      super(props);
      this.state={
          message:'',
          users:[],
          currentPage: 1,
          todosPerPage: 2
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

  handleClick=(event)=> {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render () {
  
      let {users, currentPage, todosPerPage}=this.state;

      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = users.slice(indexOfFirstTodo, indexOfLastTodo);

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(users.length / todosPerPage); i++) {
      pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li className="colorBtnDark btnClass m-2 px-2 py-1" style={{display:"inline", color:'white', borderRadius:'3px' }}
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });

          return <>
          <Table striped bordered hover responsive>
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
                 currentTodos.map(u=> {
                   return <Users u={u} deleteUser={this.deleteUser}/>
              
                 })
          }
            </tbody>
          </Table>
          <ul id="page-numbers">
            {renderPageNumbers}
            </ul>
            </>
  }
  }
  
  export {ViewAllUsers};