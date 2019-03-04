import React,{Component} from 'react';
import { Form, Button} from 'react-bootstrap';
import Axios from 'axios';


class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            addNew:this.props.user,
            message:''
        }
     
    }
   
    onChange= (event) =>{
        const {name, value}=event.target;
        const {addNew}=this.state;
        addNew[name]=value;
        this.setState({addNew})
       
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        const {addNew}=this.state;
        console.log(addNew)
        if((addNew["firstname"]===""||addNew["firstname"]===undefined) || (addNew["lastname"]==="" || addNew["lastname"]===undefined) || (addNew["username"]==="" || addNew["username"]===undefined) || (addNew["password"]==="" || addNew["password"]===undefined) || (addNew["phone"]==="" || addNew["phone"]===undefined) || (addNew["sex"]==="" || addNew["sex"]===undefined)){
            return this.setState({message:"Field is empty"});
        }
        const data=addNew;
        this.setState({addNew:{}})
        Axios.post('//localhost:3000/api/user/editProfile',data)
        .then(response=>{
            if (response.data.success){
              const {edit}=this.props;
              edit(response.data.RESULT);              
                this.setState({message: response.data.msg })
            }else {
                this.setState({message: response.data.msg})
            }
        })
    }
    render () {
      let {addNew}=this.state;      
          return (<div style={{width:"50%"}}>
          <Form onSubmit={this.onSubmit}>
                   <p style={{color:"red"}}>{this.state.message}</p>
           <Form.Group controlId="formBasicEmail">
             <Form.Label>First Name</Form.Label>
             <Form.Control type="string" placeholder="" name="firstname" value={addNew["firstname"]} onChange={this.onChange}/>
           </Form.Group>
         
           <Form.Group controlId="formBasicPassword">
             <Form.Label>Last Name</Form.Label>
             <Form.Control  type="string" placeholder="" name="lastname" value={addNew["lastname"]} onChange={this.onChange}/>
           </Form.Group>
         
           <Form.Group controlId="formBasicPassword">
             <Form.Label>User Name</Form.Label>
             <Form.Control type="string" placeholder="" name="username" value={addNew["username"]} onChange={this.onChange}/>
           </Form.Group>
         
           <Form.Group controlId="formBasicPassword">
             <Form.Label>Password</Form.Label>
             <Form.Control type="string" name="password" value={addNew["password"]} onChange={this.onChange}/>
           </Form.Group>

           <Form.Group controlId="formBasicPassword">
             <Form.Label>Phone</Form.Label>
             <Form.Control type="string" name="phone" value={addNew["phone"]} onChange={this.onChange}/>
           </Form.Group>

           <Form.Group controlId="formBasicPassword">
           <div key={`inline-${"radio"}`} className="mb-3">
             {/* <Form.Label>Sex</Form.Label> */}
             <Form.Check inline  type="radio" aria-label="radio 1" label="Female" name="sex" value="female" checked={addNew["sex"]==="female" ? true : false} id={`inline-${"radio"}-1`} onChange={this.onChange}/>
             <Form.Check inline  type="radio" aria-label="radio 1" label="Male" name="sex" value="Male" checked={addNew["sex"]==="male" ? true : false} id={`inline-${"radio"}-1`} onChange={this.onChange}/>
             </div>
           </Form.Group>
          
           <Button variant="primary" type="submit">
             Submit
           </Button>
         </Form>
                 </div>
                  
                 )
       
       
    }
}


export {EditProfile}