import React,{Component} from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import Axios from 'axios';


class Article extends Component {
  state={
    message:''
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
            this.setState({message:response.data.msg});
            deleteArticle(article._id);
        }else {
            this.setState({message: response.data.msg })
            
        }
    });
  }

    render() {
        const {article, user}= this.props;
        return <Col sm={6} xs={12}>
                <p style={{color:"red"}}>{this.state.message}</p>
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
            <Button className="colorBtnDark btnClass">Read More</Button>
            </Col>
          <Col sm={6} md={6} lg={{span: 5, offset:3}}>
          <Button className="colorBtnDark btnClass mr-2" onClick={this.delete}>Delete</Button>
          <Button className="colorBtnDark btnClass">Edit</Button>
          </Col>
          </Row>
        </Card.Body>
      
      </Card>
      </Col>
    }
}

export {Article}