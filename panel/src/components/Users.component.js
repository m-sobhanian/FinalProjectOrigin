import React,{Component} from 'react';
import {Button } from 'react-bootstrap';
import Axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state={
            pass: this.props.u['password'],
            message:''

        }
    }
    
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

    resetPass=() => {
        const {u}=this.props;
        const data={
            idUser: u._id,
            phone: u.phone
        };
        Axios.post('//localhost:3000/api/admin/resetPassword',data)
        .then(response=>{
            if (response.data.success){
                this.setState({ pass:u.phone});
            }else {
                this.setState({message: response.data.msg })
                
            }
        });
    }

    render () {
        let {u}=this.props;
        let {pass}= this.state;
            return <tr>
                <td>{u['firstname']}</td>
                <td>{u['lastname']}</td>
                <td>{u['username']}</td>
                <td>{pass}</td>
                <td>{u['phone']}</td>
                <td>{u['sex']}</td>
                <td>
                    <Button  className="colorBtnDark btnClass btn-sm mr-2" onClick={this.delete}>Delete</Button>
                    <Button  className="colorBtnDark btnClass btn-sm" onClick={this.resetPass}>Reset Password</Button>
                </td>
            </tr>
    }
}

export {Users};