import React,{Component} from 'react';
import Axios from 'axios';
import pages from './pages.css';
import {Link} from 'react-router-dom';

class RegisterPage extends Component {
state = {
    error : null,
    addNew:{},
    message:'',
    file: null
}

onChange= (event) =>{
        const {name, value, type}=event.target;
        const {addNew}=this.state;
        if(type==="file"){
            this.setState({file:event.target.files[0]});
        }
        addNew[name]=value;
        this.setState({addNew})
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {addNew}=this.state;
        
        if((addNew["fname"]===""||addNew["fname"]===undefined) || (addNew["lname"]==="" || addNew["lname"]===undefined) || (addNew["username"]==="" || addNew["username"]===undefined) || (addNew["password"]==="" || addNew["password"]===undefined) || (addNew["phone"]==="" || addNew["phone"]===undefined) || (addNew["optradio"]==="" || addNew["optradio"]===undefined)){
            return this.setState({message:"Field is empty"});
        }
        const formData = new FormData();
        formData.append('pic',this.state.file);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        // const data=addNew;
        formData.append('fname', addNew["fname"]);
        formData.append('lname', addNew["lname"])
        formData.append('username', addNew["username"])
        formData.append('password', addNew["password"])
        formData.append('phone', addNew["phone"])
        formData.append('optradio', addNew["optradio"])

        this.setState({addNew:{}})
        Axios.post('//localhost:3000/signUp',  formData)
        .then(response=>{
            if (response.data.success){
                window.location = '/panel/login';
            }else {
                this.setState({message: response.data.msg})
            }
        })
    }
    render() {
        const {addNew}=this.state;
        return <div className="registerMain">
        <div className="register col-10 col-sm-10 col-md-9 col-lg-8">
        <div className="row">
            <div className="col-sm-4 imageSignUp"></div>   
            <div className="col-12 col-sm-8 py-4 paddingX">
            <h2 className="pb-4">Sign Up</h2>
            <p style={{color:"red"}}>{this.state.message}</p>
            <form onSubmit={this.onSubmit} className="mb-3">
                <div className="form-group">
                <input className="form-control" type= "text" name="fname" placeholder="First Name" value={addNew["fname"]} onChange={this.onChange}></input>
                </div>
                <div className="form-group">
                <input className=" form-control" type= "text" name="lname" placeholder="Last Name" value={addNew["lname"]} onChange={this.onChange}></input>
                </div>
                <div className=" form-group">
                <input className="form-control" type= "text" name="username" placeholder="Email" value={addNew["username"]} onChange={this.onChange}></input>
                </div>
                <div className=" form-group">
                <input className="form-control" type= "password" name="password" placeholder="Password" value={addNew["password"]} onChange={this.onChange}></input>
                </div>
                <div className=" form-group">
                <input className="form-control" type= "text" name="phone" placeholder="Phone" value={addNew["phone"]} onChange={this.onChange}></input>
                </div>
               
              
                <div className="form-check-inline mb-3">
                    <label className="form-check-label mr-4" for="radio1">
                        <input type="radio" className="form-check-input" id="radio1" name="optradio" value="male" onChange={this.onChange}/> Male
                    </label>
               
                    <label className="form-check-label" for="radio2">
                        <input type="radio" className="form-check-input" id="radio2" name="optradio" value="female"  onChange={this.onChange}/> Female
                    </label>
                </div>               
              
                <div className="mb-3">
                <input className="inputFile float-right w-100" type="file" name="pic" onChange={this.onChange}></input>
                </div>
                <div>
                    <button className="btn border-0 btnRegister mt-4" type="submit">Sign Up</button>
                </div>
                
            </form>
               
            <Link to="login" className="App-link">Sign In</Link>
            </div>         
        </div>
        </div>
        </div>
      
    }
}
export {RegisterPage};