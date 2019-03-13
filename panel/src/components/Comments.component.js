import React,{Component} from 'react';
import Axios from 'axios';
import {Row} from 'react-bootstrap';
import {PerComment} from '../components'

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

    deleteComment=(id) => {
        let {comments}=this.state;
        comments=comments.filter(comment => {
                return comment['_id']!==id;
               })
               this.setState({comments});
    }
    render() {
        const {comments}=this.state;
        let {commentNew, role, pic}=this.props;
        let CN=commentNew;
        if(CN.length!==0){
            CN.forEach(element => {
                comments.push(element);
            });
            CN.length=0;
        }
        return <Row>
            {
                comments.map(comment => {
                    return <PerComment comment={comment} role={role} deleteComment={this.deleteComment} pic={pic}/>
                  
                                        })
                                    }
            </Row>
       
      
         
    }
}

export {Comments}
