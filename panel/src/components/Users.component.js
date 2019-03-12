import React,{Component} from 'react';
import {Button } from 'react-bootstrap';
import Axios from 'axios';

class Users extends Component {

    delete=() => {
        const {u, deleteUser}=this.props;
        const data={
            idUser: u._id,
            pic:u.pic
          };
        Axios.post('//localhost:3000/api/admin/deleteUser',data)
        .then(response=>{
            if (response.data.success){
                deleteUser(u['_id']);
                this.setState({message:response.data.msg});
            }else {
                this.setState({message: response.data.msg })
                
            }
        });
    }
    render () {
  
        let {u}=this.props;
    
            return <tr>
                <td>{u['firstname']}</td>
                <td>{u['lastname']}</td>
                <td>{u['username']}</td>
                <td>{u['password']}</td>
                <td>{u['phone']}</td>
                <td>{u['sex']}</td>
                <td><Button  className="colorBtnDark btnClass btn-sm" onClick={this.delete}>Delete</Button></td>
            </tr>
    }
}

export {Users};