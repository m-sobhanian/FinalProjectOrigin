import React,{Component} from 'react';
import { Card, Button } from 'react-bootstrap';


class Article extends Component {
    render() {
        const {article}= this.props;
        return <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180"/>
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
          <Button variant="primary">Read More</Button>
        </Card.Body>
      
      </Card>;
    }
}

export {Article}