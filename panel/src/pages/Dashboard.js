import React,{Component} from 'react';
import { Row, Col, Nav, Tab, Image, Button} from 'react-bootstrap';
import {NewArticle, ViewMyArticles, EditProfile, EditAvatar, ViewAllArticles} from '../components'
import Axios from 'axios';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      articleNew : [],
      message:'',
      user:{},
      isRequest:true,
      aN :[],
      idA: [],
      ArtEdited: {}
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
      let {articleNew, aN}=this.state;
      articleNew=[];
      aN=[];
      articleNew.push(article);
      aN.push(article);
      this.setState({articleNew, aN});
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

    deleteA=(id)=> {
    let {idA}=this.state;
    idA.push(id);
    this.setState({idA});
    }

    editA=(result)=> {
      let {ArtEdited}=this.state;
      ArtEdited={};
      ArtEdited=result;
      this.setState({ArtEdited});
    }

    render() {
        const {user, isRequest, articleNew, aN, idA, ArtEdited}=this.state;
      if(isRequest){
        return <p>Waiting ...</p>
      }
        return  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col xs={6} sm={3} className="sidebarLeft">
          <Image className="avatarPro" src={"../../../uploads/avatar/" + user["pic"]} roundedCircle/>
          <p className="text-white mt-2"> {user["firstname"] + " " + user["lastname"]}</p>
            <Nav variant="pills" className="flex-column">
            <Nav.Item>
                <Nav.Link className="colorTabLight" eventKey="first">New Article</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="colorTabLight" eventKey="second">My Articles</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="colorTabLight" eventKey="third">All Articles</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="colorTabLight" eventKey="fourth">Edit Profile</Nav.Link>
              </Nav.Item>
            <Nav.Item>
                <Nav.Link className="colorTabLight" eventKey="fifth">Edit Avatar</Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Button className="colorBtnDark btnClass mt-4" onClick={this.logout}>
                Logout
            </Button>
      
          </Col>
          <Col xs={6} sm={9} className="contentRight mtContent">
            <Tab.Content>
            <Tab.Pane eventKey="first">
              <NewArticle add={this.addArticle}/>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
            <ViewMyArticles articleNew={articleNew} user={user} deleteA={this.deleteA} editA={this.editA}/>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
              <ViewAllArticles aN={aN} user={user} idA={idA} ArtEdited={ArtEdited}/>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
              <EditProfile user={user} edit={this.editPro}/>
              </Tab.Pane>
            <Tab.Pane eventKey="fifth">
              <EditAvatar edit={this.editAvatar} pic={user["pic"]}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
     
    }
}

export {Dashboard};