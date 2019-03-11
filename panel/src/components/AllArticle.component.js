import React,{Component} from 'react';
import { Card, Button, Col, Row, Collapse, Form } from 'react-bootstrap';
import Axios from 'axios';
import {Comments} from '../components'

class AllArticle extends Component {
    state={
        message:'',
        isReadMore: false,
        open: false,
        open2: false
          }

  readMore=()=>{
    let {isReadMore}= this.state;
    isReadMore=true;
    this.setState({isReadMore});
  }

  exitReadmore=()=>{
    let {isReadMore}= this.state;
    isReadMore=false;
    this.setState({isReadMore});
  }

  saveComment=(event) => {
    event.preventDefault();
    const {article}=this.props;
    const data={
      name: event.target["name"].value,
      content: event.target["content"].value,
      article: article['_id'],
      FCM : '1'
    }
    Axios.post('//localhost:3000/api/user/saveComment',data)
    .then(response=>{
        if (response.data.success){
          this.setState({commentNew:response.data.comment, message: response.data.msg});

        }else {
            this.setState({message: response.data.msg})
        }
    })
  }

    render() {
        const {article, user}= this.props;
        const {isReadMore, open, open2}= this.state;
        if(isReadMore){
                      return <Col sm={12} xs={12}>
                        <Card className="text-center mb-2">
                        <Card.Img className="imgArticle" variant="top" src={"../../../uploads/article/" + article.pic}/>
                        <Card.Header>{article.name}</Card.Header>
                        <Card.Body>
                        <Card.Title> {article.author.firstname ? article.author.firstname + " " + article.author.lastname : user["firstname"] + " " + user["lastname"] }</Card.Title>
                        <Card.Text>
                        {article.shortTxt}
                        </Card.Text>
                        <Card.Text>
                        {article.longTxt}
                        </Card.Text>
                        <Card.Text>
                        {article.date}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Button className="colorBtnDark btnClass" onClick={this.exitReadmore}>Back</Button>
                        </Card.Footer>
                        </Card>
                        <Button className="colorBtnDark btnClass float-left mb-4" 
                        onClick={() => this.setState({ open2: !open2 })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        >
                        View Comments
                      </Button>
                      <Collapse in={this.state.open2}>
                        <Row id="example-collapse-text" className="mb-4 pl-4">
                          <Comments id={article['_id']}/>
                        </Row>
                      </Collapse>

                        <Button className="colorBtnDark btnClass float-left mr-4 ml-2 mb-4" 
                        onClick={() => this.setState({ open: !open })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        >
                        New Comment
                      </Button>
                      <Collapse in={this.state.open}>
                        <div id="example-collapse-text" >
                        <Form onSubmit={this.saveComment}>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="Name" name="name"/>
                          </Form.Group>
                          <Form.Group controlId="formBasicPassword">
                            <Form.Control as="textarea" rows="2" name="content"/>
                          </Form.Group>
                          <Col sm={1}>
                          <Button className="colorBtnDark btnClass mb-4" type="submit">
                            Send
                          </Button>
                          </Col>
                        </Form>
                        </div>
                      </Collapse>
                        
                      
                        </Col>
                    }
                    if(typeof(article.author)=="object"){
                      return <Col sm={6} xs={12}>
              <Card className="mbCard">
              <Card.Img className="imgArticle" variant="top" src={"../../../uploads/article/" + article.pic}/>
              <Card.Body>
                <Card.Title>{article.name}</Card.Title>
                <Card.Text>
                 {article.author.firstname + " " + article.author.lastname }
                </Card.Text>
                <Card.Text>
                 {article.shortTxt}
                </Card.Text>
                <Card.Text>
                 {article.date}
                </Card.Text>
                <Row className="justify-content-center">
                  <Col sm={6} md={6} lg={4}>
                  <Button className="colorBtnDark btnClass" onClick={this.readMore}>Read More</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Button className="colorBtnDark btnClass float-left mr-4 mb-4" 
                        onClick={() => this.setState({ open: !open })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        >
                        New Comment
                      </Button>
                      <Collapse in={this.state.open}>
                        <div id="example-collapse-text">
                        <Form onSubmit={this.saveComment}>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="Name" name="name"/>
                          </Form.Group>
                          <Form.Group controlId="formBasicPassword">
                            <Form.Control as="textarea" rows="2" name="content"/>
                          </Form.Group>
                          <Col sm={2}>
                          <Button className="colorBtnDark btnClass" type="submit">
                            Send
                          </Button>
                          </Col>
                          <p style={{color:"red"}}>{this.state.message}</p>
                        </Form>
                        </div>
                      </Collapse>

            </Col>
                    }
                    else {
                      return <Col sm={6} xs={12}>
                      <p style={{color:"red"}}>{this.state.message}</p>
              <Card className="mbCard">
              <Card.Img className="imgArticle" variant="top" src={"../../../uploads/article/" + article.pic}/>
              <Card.Body>
                <Card.Title>{article.name}</Card.Title>
                <Card.Text>
                 {user["firstname"] + " " + user["lastname"] }
                </Card.Text>
                <Card.Text>
                 {article.shortTxt}
                </Card.Text>
                <Card.Text>
                 {article.date}
                </Card.Text>
                <Row className="justify-content-center">
                  <Col sm={6} md={6} lg={4}>
                  <Button className="colorBtnDark btnClass" onClick={this.readMore}>Read More</Button>
                  </Col>
                </Row>
              </Card.Body>
            
            </Card>
            <Button className="colorBtnDark btnClass float-left mr-4 mb-4" 
                        onClick={() => this.setState({ open: !open })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        >
                        New Comment
                      </Button>
                      <Collapse in={this.state.open}>
                        <div id="example-collapse-text">
                        <Form onSubmit={this.saveComment}>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="Name" name="name"/>
                          </Form.Group>
                          <Form.Group controlId="formBasicPassword">
                            <Form.Control as="textarea" rows="2" name="content"/>
                          </Form.Group>
                          <Col sm={2}>
                          <Button className="colorBtnDark btnClass" type="submit">
                            Send
                          </Button>
                          </Col>
                          <p style={{color:"red"}}>{this.state.message}</p>
                        </Form>
                        </div>
                      </Collapse>

                     </Col>
                    }
                     
    }
}

export {AllArticle}