import React,{Component} from 'react';
import { Form, Button, Row, Col, Modal} from 'react-bootstrap';
import Axios from 'axios';


class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            addNew:this.props.user,
            message:'',
            show: false
        }
     
    }
   
    onChange= (event) =>{
        const {name, value}=event.target;
        const {addNew}=this.state;
        this.setState({addNew:{...addNew, [name]:value}})
       
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        const {addNew}=this.state;
        if((addNew["firstname"]===""||addNew["firstname"]===undefined) || (addNew["lastname"]==="" || addNew["lastname"]===undefined) || (addNew["username"]==="" || addNew["username"]===undefined) || (addNew["password"]==="" || addNew["password"]===undefined) || (addNew["phone"]==="" || addNew["phone"]===undefined) || (addNew["sex"]==="" || addNew["sex"]===undefined)){
            return  alert("Field is empty");
            // this.setState({message:"Field is empty"});
        }
        const data=addNew;
        Axios.post('//localhost:3000/api/user/editProfile',data)
        .then(response=>{
            if (response.data.success){
              this.setState({show: true, message: response.data.msg});
              const {edit}=this.props;
              edit(response.data.RESULT);

                // this.setState({message: response.data.msg })
            }else {
              this.setState({show: true, message: response.data.msg});

                // this.setState({message: response.data.msg})
            }
        })
    }

    handleClose=()=> {
      this.setState({ show: false });
    }

    render () {
      let {addNew}=this.state;      
          return (<div style={{width:"50%"}}>
          <Form onSubmit={this.onSubmit}>
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
             <Form.Check inline  type="radio" aria-label="radio 1" label="Female" name="sex" value="female" checked={addNew["sex"]==="female" ? true : false} id={`inline-${"radio"}-1`} onChange={this.onChange}/>
             <Form.Check inline  type="radio" aria-label="radio 1" label="Male" name="sex" value="Male" checked={addNew["sex"]==="male" ? true : false} id={`inline-${"radio"}-1`} onChange={this.onChange}/>
             </div>
           </Form.Group>
           <Row className="justify-content-sm-center">
            <Col sm={2}>
           <Button className="colorBtnDark btnClass" type="submit">
             Submit
           </Button>
           </Col>
           </Row>
         </Form>
         <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.message}</Modal.Body>
          <Modal.Footer>
            <Button className="colorBtnDark btnClass" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
                 </div>
                  
                 )
       
       
    }
}


export {EditProfile}