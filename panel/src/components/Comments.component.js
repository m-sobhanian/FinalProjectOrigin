import React,{Component} from 'react';
import Axios from 'axios';
import {Row, Media, Col} from 'react-bootstrap';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:'',
            comments:[]
        }
        const {id}=this.props;
        const data={id:id};
        Axios.post('//localhost:3000/api/user/findComments',data)
        .then(response=>{
            if (response.data.success){ 
               
              this.setState({message: response.data.msg, comments: response.data.comments});
            }else {
             
                this.setState({message: response.data.msg});
            }
        })
    }

    render() {
        const {comments}=this.state;
        return <Row>
            {
                comments.map(comment => {
                    return <Col sm={12}>
                    <Media>
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={"../../../uploads/avatar/" + comment.author.pic}
                            alt="Generic placeholder"
                        />
                        <Media.Body>
                            <h5>{comment['name']}</h5>
                            <p>
                           {comment['content']}
                            </p>
                        </Media.Body>
                        </Media>
                                            </Col>
                                        })
                                    }
            </Row>
       
      
         
    }
}

export {Comments}
