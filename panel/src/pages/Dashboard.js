import React,{Component} from 'react';
import { Row, Col, Nav, Tab, Image, Button} from 'react-bootstrap';
import {NewArticle, ViewMyArticles, EditProfile, EditAvatar} from '../components'
import Axios from 'axios';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      articleNew : [],
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
          this.setState({user, isRequest: false});
        }else {
          this.setState({message: response.data.msg, isRequest: false })
            
        }
    });
  }
  
    logout=()=>{
        localStorage.removeItem('loginData');
        window.location="/";
    }
    
    addArticle = (article) => {
      let {articleNew}=this.state;
      articleNew=[];
      articleNew.push(article);
      this.setState({articleNew});
    }

    editPro = (u) => {
      let {user}=this.state;
      user=u;
      this.setState({user});
    }

    editAvatar =(data)=> {
      const {user}=this.state;
      user["pic"]=data;
      this.setState({user});
    }
    render() {
        const {user, isRequest, articleNew}=this.state;
      if(isRequest){
        return <p>Waiting ...</p>
      }
        return  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col xs={6} sm={3} className="sidebarLeft">
          <Image className="avatarPro" src={"../../../uploads/avatar/" + user["pic"]} roundedCircle/>
          <p className="text-white"> {user["firstname"] + " " + user["lastname"]}</p>
            <Nav variant="pills" className="flex-column">
            <Nav.Item>
                <Nav.Link className="colorTabLight" eventKey="first">Edit Avatar</Nav.Link>
              </Nav.Item>
            <Nav.Item>
                <Nav.Link className="colorTabLight" eventKey="second">Edit Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="colorTabLight" eventKey="third">Create Article</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="colorTabLight" eventKey="fourth">View My Articles</Nav.Link>
              </Nav.Item>
             
            </Nav>
            
            <Button className="colorBtnDark btnClass mt-4" onClick={this.logout}>
                Logout
            </Button>
      
          </Col>
          <Col xs={6} sm={9} className="contentRight mtContent">
            <Tab.Content>
            <Tab.Pane eventKey="first">
              <EditAvatar edit={this.editAvatar} pic={user["pic"]}/>
              </Tab.Pane>
            <Tab.Pane eventKey="second">
              <EditProfile user={user} edit={this.editPro}/>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
              <NewArticle add={this.addArticle}/>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
              <ViewMyArticles articleNew={articleNew} user={user}/>
              </Tab.Pane>
             
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
     
    }
}

export {Dashboard};