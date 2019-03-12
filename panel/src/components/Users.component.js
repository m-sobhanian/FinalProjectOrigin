import React,{Component} from 'react';
import {Button } from 'react-bootstrap';

class Users extends Component {
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