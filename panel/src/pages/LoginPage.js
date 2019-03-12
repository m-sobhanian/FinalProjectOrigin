import React,{Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';


class LoginPage extends Component {
state = {
    error : null,
    message:''

}
    onSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: event.target["username"].value,
            password: event.target["password"].value,
            FCM: '1'
        }
       
        Axios.post('//localhost:3000/signin',data)
        .then(response=>{
            if (response.data.success){
                localStorage.setItem('loginData',JSON.stringify(data));
                let u=response.data.user;
                let role=u['role'];
                if(role==='user'){
                    window.location = '/panel/dashboard';
                }
                else{
                    window.location= '/panel/dashboardAdmin'
                }
            }else {
                this.setState({message: response.data.msg})
            }
        })
    }

    onChange = (event)=>{
        const {value,name}=event.target;
        console.log(value)
        this.setState({[name]:value})
    }

    render() {
        return <div className="registerMain">
        <div className="register col-10 col-sm-10 col-md-9 col-lg-8">
        <div className="row">
            <div className="col-sm-4 imageSignUp"></div>   
            <div className="col-12 col-sm-8 py-4 paddingX">
            <h2 className="pb-4">Sign In</h2>
            <p style={{color:"red"}}>{this.state.message}</p>
            <form onSubmit={this.onSubmit} className="mb-3">
                <div className="form-group">
                    <input className="form-control" type= "text" name="username" placeholder="Email" value={this.state.username} onChange={this.onChange}></input>
                </div>
                <div className="form-group">
                    <input className="form-control" type= "password" name="password" placeholder="Password"></input>
                </div>
                <div>
                    <button className="btn border-0 btnRegister mt-4" type="submit">Sign In</button>
                </div>
            </form>
               
            <Link to="register" className="App-link">Sign Up</Link>
            </div>         
        </div>
        </div>
        </div>
      
    }
}
export {LoginPage};