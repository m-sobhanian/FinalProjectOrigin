import React,{Component} from 'react';
import { Form, Row, Col, Button, Modal} from 'react-bootstrap';
import Axios from 'axios';


class EditAvatar extends Component {
  state = {
    message:'',
    file: null,
    show: false

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
              this.setState({show: true, message: response.data.msg});
                const {edit}=this.props;
                edit(response.data.PIC);
            }else {
              this.setState({show: true, message: response.data.msg});
            }
        })
  }

  handleClose=()=> {
    this.setState({ show: false });
  }

    render () {
      return <Row>
                <Col sm={6} xs={12}>
                <Form onSubmit={this.onSubmit}>
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
              </Row>
       
    }
}


export {EditAvatar}