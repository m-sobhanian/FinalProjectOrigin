import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import Axios from 'axios';

export default class PrivateRouter extends Component{
    constructor(props) {
        super(props);
        this.state={
            isAllow: !!localStorage.loginData,
            isRequest: !!localStorage.loginData,
            user:{}
        }
        if (localStorage.loginData) {
            const data = JSON.parse(localStorage.loginData);
            Axios.post('//localhost:3000/signin',data)
            .then(response=>{
                this.setState({
                    isAllow : response.data.success,
                    isRequest : false,
                    user: response.data.user
                })
            })
        }
    }
    render() {
        console.log(this.state.user)
        const {path,component} = this.props;
        const {isAllow,isRequest} = this.state;
        if (isRequest) {
            return <p>Waiting ...</p>
        }
        if (isAllow){
            return <Route path={path} render={() => <component user={this.state.user}/>} />
            
        }
        return <Redirect to="login"/>
    }
}