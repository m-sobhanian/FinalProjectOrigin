import React,{Component} from 'react';
import Axios from 'axios';
import pages from './pages.css';
import {Link} from 'react-router-dom';

class RegisterPage extends Component {
state = {
    error : null,
    addNew:{},
    message:''
}

onChange= (event) =>{
        const {name, value, type}=event.target;
        const {addNew}=this.state;
        if(type==="file"){
            console.log(event.target.files[0]);
            addNew[name]=event.target.files[0];
        }
        addNew[name]=value;
        this.setState({addNew})
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {addNew}=this.state;
        const formData = new FormData();
        formData.append('pic',addNew["pic"]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if((addNew["fname"]===""||addNew["fname"]===undefined) || (addNew["lname"]==="" || addNew["lname"]===undefined) || (addNew["username"]==="" || addNew["username"]===undefined) || (addNew["password"]==="" || addNew["password"]===undefined) || (addNew["phone"]==="" || addNew["phone"]===undefined) || (addNew["optradio"]==="" || addNew["optradio"]===undefined) || (addNew["pic"]==="" || addNew["pic"]===undefined)){
            return this.setState({message:"Field is empty"});
        }
        const data=addNew;
        this.setState({addNew:{}})
        Axios.post('//localhost:3000/signUp', formData, config, data)
        .then(response=>{
            if (response.data.success){
                // window.location = '/panel/register';
                this.setState({message: response.data.msg })
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
            <form onSubmit={this.onSubmit} >
                <div class="form-group">
                <div className="mb-3">
                <input class="w-100" type= "text" name="fname" placeholder="First Name" value={addNew["fname"]} onChange={this.onChange}></input>
                </div>
                <div className="mb-3">
                <input class="w-100" type= "text" name="lname" placeholder="Last Name" value={addNew["lname"]} onChange={this.onChange}></input>
                </div>
                <div className="mb-3">
                <input class="w-100" type= "text" name="username" placeholder="Email" value={addNew["username"]} onChange={this.onChange}></input>
                </div>
                <div className="mb-3">
                <input class="w-100" type= "password" name="password" placeholder="Password" value={addNew["password"]} onChange={this.onChange}></input>
                </div>
                <div className="mb-3">
                <input class="w-100" type= "text" name="phone" placeholder="Phone" value={addNew["phone"]} onChange={this.onChange}></input>
                </div>
               
                <div className="mb-3 float-right w-100">
                <span className="lableSex">Sex:</span>
                <div class="form-check-inline">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="optradio" value="male" onChange={this.onChange}/> Male
                    </label>
                </div>    
                <div class="form-check-inline">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="optradio" value="female"  onChange={this.onChange}/> Female
                    </label>
                </div>               
                </div>
                <div className="mb-3">
                <input className="inputFile float-right w-100" type="file" name="pic" onChange={this.onChange}></input>
                </div>
                <div>
                    <button className="btn border-0 btnRegister mt-4" type="submit">Sign Up</button>
                </div>
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