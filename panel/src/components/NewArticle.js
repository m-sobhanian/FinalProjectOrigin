import React,{Component} from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import Axios from 'axios';


class NewArticle extends Component {
    constructor(...args) {
        super(...args);
    
        this.state = { 
            validated: false,
            message:''
         };
      }
    
      handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        this.setState({ validated: true });
        event.preventDefault();
        const data = {
            nameArticle : event.target["nameArticle"].value,
            abstract : event.target["abstract"].value,
            textArticle : event.target["textArticle"].value,
            dateArticle : event.target["dateArticle"].value,
            FCM: '1'
        }
        console.log(data);
        Axios.post('//localhost:3000/api/user/newArticle',data)
        .then(response=>{
            if (response.data.success){
                this.setState({message: response.data.msg })
            }else {
                this.setState({message: response.data.msg})
            }
        })
      }
    
      render() {
        const { validated } = this.state;
        return (
          <Form 
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
          >
           <p style={{color:"red"}}>{this.state.message}</p>
            <Form.Row className="justify-content-md-center">
                
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name Of Article</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name Of Article"
                  defaultValue="React"
                  name="nameArticle"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              </Form.Row>
              <Form.Row className="justify-content-md-center">
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Abstract</Form.Label>
                <Form.Control as="textarea" rows="2" name="abstract" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              </Form.Row>
              <Form.Row className="justify-content-md-center">
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Article Text</Form.Label>
                <Form.Control as="textarea" rows="5" name="textArticle" />
                  <Form.Control.Feedback type="invalid">
                    Please enter a Article Text.
                  </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-md-center">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control type="Date" placeholder="Date" required name="dateArticle"/>
                <Form.Control.Feedback type="invalid">
                  Please choose a date.
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Picture</Form.Label>
                <Form.Control type="file" placeholder="Picture" required />
                <Form.Control.Feedback type="invalid">
                  Please choose a valid picture.
                </Form.Control.Feedback>
              </Form.Group> */}
             
            </Form.Row>
            <Row className="justify-content-md-center">
            <Button as={Col} md="4" type="submit">Create Article</Button>

            </Row>
          </Form>
        );
      }
}

export {NewArticle}