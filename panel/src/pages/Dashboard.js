import React,{Component} from 'react';
import { Row, Col, Nav, Tab, Button, Jumbotron } from 'react-bootstrap';
import {NewArticle, ViewMyArticles, EditProfile} from '../components'
import Axios from 'axios';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      articleArray : [],
      message:'',
      user:{},
      isRequest:true
    }

    const data={};
    Axios.post('//localhost:3000/api/user/whoAmI',data)
    .then(response=>{
        if (response.data.success){
          let {user}=this.state;
          user=response.data.user;
          // console.log("aaaaa " + user["firstname"]);
          this.setState({user, isRequest: false});
        }else {
          this.setState({message: response.data.msg, isRequest: false })
            
        }
    });
  }
  
    logout=()=>{
        localStorage.removeItem('loginData');
        window.location="/panel/login";
    }
    
    addArticle = (article) => {
      let {articleArray}=this.state;
      articleArray=[];
      articleArray.push(article);
      this.setState({articleArray});
    }

    editPro = (u) => {
      let {user}=this.state;
      user=u;
      this.setState({user});
    }
    render() {
        console.log("Dashboarddddddd")
        const {user, isRequest}=this.state;
        console.log(user["pic"])
      if(isRequest){
        return <p>Waiting ...</p>
      }
        return <Jumbotron>
          <Row className="justify-content-md-center">
          <Col md={2}>
            <Button variant="outline-primary" onClick={this.logout}>Logout</Button>
            </Col>
            <Col md={10}>
            <h1>Welcome {user["firstname"] + " " + user["lastname"]}</h1>
            <img src={"../../../" + user["pic"]}/>
            </Col>
            </Row>
         
         <br></br>
           
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={3}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first">Create Article</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">View My Articles</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="three">Edit Profile</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
        <NewArticle add={this.addArticle}/>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
        <ViewMyArticles articleArray={this.state.articleArray}/>
        </Tab.Pane>
        <Tab.Pane eventKey="three">
        <EditProfile user={user} edit={this.editPro}/>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
            </Jumbotron>
    }
}

export {Dashboard};