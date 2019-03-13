import React,{Component} from 'react';
import { Card, Button, Col, Row, Collapse, Form, Modal } from 'react-bootstrap';
import Axios from 'axios';
import {Comments} from '../components'

class AllArticle extends Component {
    state={
        message:'',
        isReadMore: false,
        open: false,
        open2: false,
        commentNew: [],
        show: false

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
          let {commentNew}=this.state;
          commentNew=[];
          commentNew.push(response.data.comment);
          this.setState({show: true, message: response.data.msg, commentNew});

          // this.setState({commentNew, message: response.data.msg});

        }else {
          this.setState({show: true, message: response.data.msg});

        }
    })
  }

  delete=() => {
    const {article,deleteArticle}= this.props;
    const data={
      idArticle: article._id,
      pic:article.pic
    };
    Axios.post('//localhost:3000/api/user/deleteArticle',data)
    .then(response=>{
        if (response.data.success){
          alert(response.data.msg);
          // this.setState({message: response.data.msg});

            deleteArticle(article._id);
        }else {
          alert(response.data.msg);

          // this.setState({show: true, message: response.data.msg});

            
        }
    });
  }

  handleClose=()=> {
    this.setState({ show: false });
  }

    render() {
        const {article, user}= this.props;
        const {isReadMore, open, open2, commentNew}= this.state;
        if(isReadMore){
                      return <Col sm={12} xs={12}>
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
                            <Button className="colorBtnDark btnClass mr-3" onClick={this.exitReadmore}>Back</Button>
                            {user['role']==='admin'? <Button className="colorBtnDark btnClass" onClick={this.delete}>Delete</Button>: ''}

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
                          <Comments id={article['_id']} role={user['role']} commentNew={commentNew} pic={user['pic']}/>
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
                  <Button className="colorBtnDark btnClass mb-2" onClick={this.readMore}>Read More</Button>
                  {user['role']==='admin'? <Button className="colorBtnDark btnClass" onClick={this.delete}>Delete</Button>: ''}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          
            </Col>
                    }
                    else {
                      return <Col sm={6} xs={12}>
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
                  <Button className="colorBtnDark btnClass mb-2" onClick={this.readMore}>Read More</Button>
                  {user['role']==='admin'? <Button className="colorBtnDark btnClass" onClick={this.delete}>Delete</Button>: ''}
                  </Col>
                </Row>
              </Card.Body>
            
            </Card>

                     </Col>
                    }
                     
    }
}

export {AllArticle}