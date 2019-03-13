import React,{Component} from 'react';
import Axios from 'axios';
import { Media, Col, Button} from 'react-bootstrap';

class PerComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.comment['_id']
        }
    }

    delCom=() => {
        const {id}=this.state;
        const data={idComment:id}
        Axios.post('//localhost:3000/api/admin/deleteComment',data)
        .then(response=>{
            if (response.data.success){ 
                alert(response.data.msg);
                let {deleteComment}=this.props;
                deleteComment(id);
            
              this.setState({message: response.data.msg});
            }else {
                alert(response.data.msg);

                // this.setState({message: response.data.msg});
            }
        })
    }

    render() {
        const {comment,role, pic}=this.props;
            return   <Col sm={12}>
            <Media>
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={comment.author.pic? "../../../uploads/avatar/" + comment.author.pic: "../../../uploads/avatar/" + pic}
                    alt="Generic placeholder"
                />
                <Media.Body>
                    <h5>{comment['name']}</h5>
                    <p>
                   {comment['content']}
                    </p>
                    {role==='admin' ? <Button className="colorBtnDark btnClass float-left btn-sm" onClick={this.delCom}>Delete</Button> : ''} 
                </Media.Body>
                </Media>
            </Col>
        
      
      
    }
}

export {PerComment}
