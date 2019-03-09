import React,{Component} from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';


class Article extends Component {
    render() {
        const {article, user}= this.props;
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
            <Col sm={4}>
            <Button className="colorBtnDark btnClass">Read More</Button>
            </Col>
          <Col sm={{span: 5, offset:3}}>
          <Button className="colorBtnDark btnClass mr-2">Delete</Button>
          <Button className="colorBtnDark btnClass">Edit</Button>
          </Col>
          </Row>
        </Card.Body>
      
      </Card>
      </Col>
    }
}

export {Article}