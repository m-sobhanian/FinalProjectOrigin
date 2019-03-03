import React,{Component} from 'react';
import { Row, Col, Nav, Tab, Button, Jumbotron } from 'react-bootstrap';
import {NewArticle} from '../components'
import {ViewMyArticles} from '../components'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      articleArray : []
    }
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
    render() {
        // console.log("Dashboard")
        return <Jumbotron>
          <Row className="justify-content-md-center">
          <Col md={2}>
            <Button variant="outline-primary" onClick={this.logout}>Logout</Button>
            </Col>
            <Col md={10}>
            <h1>Welcome User</h1>
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
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
            </Jumbotron>
    }
}

export {Dashboard};