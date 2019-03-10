import React,{Component} from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import Axios from 'axios';


class NewArticle extends Component {
  state = {
    message:'',
    addNewArticle: {},
    file: null
}

onChange= (event) =>{
  this.setState({file:event.target.files[0]});
 
}

  onSubmit =(event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('pic',this.state.file);

  formData.append('nameArticle', event.target["nameArticle"].value);
  formData.append('abstract', event.target["abstract"].value);
  formData.append('textArticle', event.target["textArticle"].value);
  formData.append('dateArticle', event.target["dateArticle"].value);

  Axios.post('//localhost:3000/api/user/newArticle',formData)
        .then(response=>{
            if (response.data.success){
                this.setState({message: response.data.msg });
                let {addNewArticle}=this.state;
                addNewArticle={};
                addNewArticle=response.data.article;
                const {add}=this.props;
                add(addNewArticle);


            }else {
                this.setState({message: response.data.msg})
              
            }
        })
  } 
    
      render() {
        return (<Row>
          <Col sm={6} xs={12}>
            <Form onSubmit={this.onSubmit}>
                      <p style={{color:"red"}}>{this.state.message}</p>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name Of Article</Form.Label>
                <Form.Control type="string" name="nameArticle"/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Abstract</Form.Label>
                <Form.Control as="textarea" rows="2" name="abstract"/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Article Text</Form.Label>
                <Form.Control as="textarea" rows="5" name="textArticle"/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="dateArticle"/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="file" name="pic" onChange={this.onChange}/>
              </Form.Group>
              <Row className="justify-content-sm-center">
                <Col sm={2}>
              <Button className="colorBtnDark btnClass" type="submit">
                Submit
              </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          </Row>
         
        );
      }
}

export {NewArticle}