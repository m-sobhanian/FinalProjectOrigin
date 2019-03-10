import React,{Component} from 'react';
import { Form, Row, Col, Button} from 'react-bootstrap';
import Axios from 'axios';


class EditAvatar extends Component {
  state = {
    message:'',
    file: null
}
  onChange= (event) =>{
    this.setState({file:event.target.files[0]});
  }

  onSubmit =(event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('pic',this.state.file);
    const {pic}=this.props;
    formData.append('pic',pic);

    Axios.post('//localhost:3000/api/user/editAvatar',formData)
        .then(response=>{
            if (response.data.success){
                this.setState({message: response.data.msg });
                const {edit}=this.props;
                edit(response.data.PIC);
            }else {
                this.setState({message: response.data.msg})
            }
        })
  }

    render () {
      return <Row>
      <Col sm={6} xs={12}>
      <Form onSubmit={this.onSubmit}>
      <p style={{color:"red"}}>{this.state.message}</p>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="file" name="pic" onChange={this.onChange}/>
        </Form.Group>
        <Col sm={2}>
        <Button className="colorBtnDark btnClass" type="submit">
         Submit
        </Button>
        </Col>
      </Form>
      </Col>
      </Row>
       
    }
}


export {EditAvatar}