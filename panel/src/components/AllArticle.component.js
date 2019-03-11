import React,{Component} from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';


class AllArticle extends Component {
    state={
        message:'',
        isReadMore: false
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


    render() {
        const {article, user}= this.props;
        const {isReadMore}= this.state;
        if(isReadMore){
                      return <Col sm={12} xs={12}>
                        <Card className="text-center">
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
                            <Button className="colorBtnDark btnClass float-left" onClick={this.exitReadmore}>Back</Button>
                        </Card.Footer>
                        </Card>
                        </Col>
                    }
                    if(typeof(article.author)=="object"){
                      return <Col sm={6} xs={12}>
                      <p style={{color:"red"}}>{this.state.message}</p>
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
                <Row>
                  <Col sm={6} md={6} lg={4}>
                  <Button className="colorBtnDark btnClass" onClick={this.readMore}>Read More</Button>
                  </Col>
                </Row>
              </Card.Body>
            
            </Card>
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
                <Row>
                  <Col sm={6} md={6} lg={4}>
                  <Button className="colorBtnDark btnClass" onClick={this.readMore}>Read More</Button>
                  </Col>
                </Row>
              </Card.Body>
            
            </Card>
            </Col>
                    }
                     
    }
}

export {AllArticle}