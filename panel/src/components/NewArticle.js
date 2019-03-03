import React,{Component} from 'react';
import { Form, Button} from 'react-bootstrap';
import Axios from 'axios';


class NewArticle extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     message:'',
  //     arrayArticles: []
  // }
  // const data={};
  // Axios.post('//localhost:3000/api/user/viewMyArticles',data)
  //       .then(response=>{
  //           if (response.data.success){
  //               this.setState({arrayArticles:response.data.articles});
  //               console.log("arrayArticle: " + this.state.arrayArticles)
  //                               console.log("articless: " + response.data.articles)


  //           }else {
  //               this.setState({message: response.data.msg })
                
  //           }
  //       });
  // }
  state = {
    message:'',
    addNewArticle: {}
}
  onSubmit =(event) => {
    event.preventDefault();
    const data = {
      nameArticle : event.target["nameArticle"].value,
      abstract : event.target["abstract"].value,
      textArticle : event.target["textArticle"].value,
      dateArticle : event.target["dateArticle"].value,
      FCM: '1'
  }
  Axios.post('//localhost:3000/api/user/newArticle',data)
        .then(response=>{
            if (response.data.success){
                this.setState({message: response.data.msg });
                let {addNewArticle}=this.state;
                addNewArticle={};
                addNewArticle=response.data.article;
                const {add}=this.props;
                add(addNewArticle);


            }else {
                this.setState({message: response.data.msg})
              
            }
        })
  } 
    
      render() {
        // console.log("NewArticle")
        return (<div>
 <Form onSubmit={this.onSubmit}>
          <p style={{color:"red"}}>{this.state.message}</p>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Name Of Article</Form.Label>
    <Form.Control type="string" placeholder="Name Of Article" name="nameArticle"/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Abstract</Form.Label>
    <Form.Control as="textarea" rows="2" name="abstract"/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Article Text</Form.Label>
    <Form.Control as="textarea" rows="5" name="textArticle"/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" name="dateArticle"/>
  </Form.Group>
 
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        </div>
         
        );
      }
}

export {NewArticle}