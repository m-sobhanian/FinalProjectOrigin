import React,{Component} from 'react';
import { Card, Button, Col, Row, Form, Modal} from 'react-bootstrap';
import Axios from 'axios';


class Article extends Component {
  constructor(props){
    super(props);
    this.state={
      message:'',
      isReadMore: false,
      editMode: false,
      addNew:this.props.article,
      file: null,
      show: false
    }
 
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
          this.setState({message:response.data.msg});
          deleteArticle(article._id);

        }else {
            this.setState({show: true, message: response.data.msg });
            
        }
    });
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

  edit=()=>{
    let {editMode, isReadMore}= this.state;
    editMode=true;
    isReadMore=true;
    this.setState({editMode, isReadMore});
  }

  exitEditMode=()=>{
    let {editMode, isReadMore}= this.state;
    editMode=false;
    isReadMore=false;
    this.setState({editMode, isReadMore});
  }

  onChange=(event)=>{
    const {name, value, type}=event.target;
        if(type==="file"){
          this.setState({file:event.target.files[0]});
        }
        const {addNew}=this.state;
        this.setState({addNew:{...addNew,[name]:value}})
  }

  saveArticle = (event) => {
    event.preventDefault();
    const {addNew}=this.state;
    const {article}=this.props;
    if((addNew["name"]===""||addNew["name"]===undefined) || (addNew["shortTxt"]==="" || addNew["shortTxt"]===undefined) || (addNew["longTxt"]==="" || addNew["longTxt"]===undefined) || (addNew["date"]==="" || addNew["date"]===undefined)){
        return this.setState({message:"Field is empty"});
    }
    const formData = new FormData();
    formData.append('pic',this.state.file);
    formData.append('_id', addNew["_id"]);
    formData.append('name', addNew["name"]);
    formData.append('shortTxt', addNew["shortTxt"]);
    formData.append('longTxt', addNew["longTxt"]);
    formData.append('date', addNew["date"]);
    formData.append('prevPic', article['pic']);

    Axios.post('//localhost:3000/api/user/editArticle',formData)
    .then(response=>{
        if (response.data.success){
          this.setState({show: true, message: response.data.msg});
          this.setState ({editMode:false, isReadMore:false})        
          const {editArticle}=this.props;
          const result=response.data.RESULT;
          result['pic']=response.data.PIC;
          editArticle(result);      
        }else {
            this.setState({show: true, message: response.data.msg});

        }
    })
}

handleClose=()=> {
  this.setState({ show: false });
}

    render() {
        const {article, user}= this.props;
        const {isReadMore, editMode, addNew}= this.state;
        if(isReadMore){
          if(editMode){
            return <Col sm={6} xs={12}>
   <Form onSubmit={this.saveArticle}>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Name Of Article</Form.Label>
      <Form.Control type="string" name="name" value={addNew["name"]} onChange={this.onChange}/>
    </Form.Group>
  
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Abstract</Form.Label>
      <Form.Control as="textarea" rows="2" name="shortTxt" value={addNew["shortTxt"]} onChange={this.onChange}/>
    </Form.Group>
  
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Article Text</Form.Label>
      <Form.Control as="textarea" rows="5" name="longTxt" value={addNew["longTxt"]} onChange={this.onChange}/>
    </Form.Group>
  
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Date</Form.Label>
      <Form.Control type="date" name="date" value={addNew["date"]} onChange={this.onChange}/>
    </Form.Group>
  
    <Form.Group controlId="formBasicPassword">
      <Form.Control type="file" name="pic" onChange={this.onChange}/>
    </Form.Group>
    <Row className="justify-content-sm-center">
    <Button className="colorBtnDark btnClass" onClick={this.exitEditMode}>Back</Button>
      <Col sm={2}>
    <Button className="colorBtnDark btnClass" type="submit">
      Save
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
  </Col>
 
          }
          return <Col sm={12} xs={12}>
          <Card className="text-center">
          <Card.Img className="imgArticle" variant="top" src={"../../../uploads/article/" + article.pic}/>
  <Card.Header>{article.name}</Card.Header>
  <Card.Body>
    <Card.Title> {user["firstname"] + " " + user["lastname"]}</Card.Title>
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
      <Button className="colorBtnDark btnClass float-left" onClick={this.exitReadmore}>Back</Button>
      <Button className="colorBtnDark btnClass float-right" onClick={this.delete}>Delete</Button>
      <Button className="colorBtnDark btnClass mr-2 float-right" onClick={this.edit}>Edit</Button>
  </Card.Footer>
</Card>
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
          </Col>
        }
        return <Col sm={6} xs={12}>
        <Card className="mbCard">
        <Card.Img className="imgArticle" variant="top" src={"../../../uploads/article/" + article.pic}/>
        <Card.Body>
          <Card.Title>{article.name}</Card.Title>
          <Card.Text>
           {user["firstname"] + " " + user["lastname"]}
          </Card.Text>
          <Card.Text>
           {article.shortTxt}
          </Card.Text>
          <Card.Text>
           {article.date}
          </Card.Text>
          <Row>
            <Col sm={6} md={6} lg={4}>
            <Button className="colorBtnDark btnClass" onClick={this.readMore}>Read More</Button>
            </Col>
          <Col sm={6} md={6} lg={{span: 5, offset:3}}>
          <Button className="colorBtnDark btnClass mr-2" onClick={this.delete}>Delete</Button>
          <Button className="colorBtnDark btnClass" onClick={this.edit}>Edit</Button>
          </Col>
          </Row>
        </Card.Body>
      
      </Card>
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
      </Col>
    }
    
}

export {Article}