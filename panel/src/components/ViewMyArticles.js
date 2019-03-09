import React,{Component} from 'react';
import Axios from 'axios';
import {Article} from '../components';
import {Row} from 'react-bootstrap';

class ViewMyArticles extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:'',
            articles:[]
        }        
        const data={};
        Axios.post('//localhost:3000/api/user/viewMyArticles',data)
        .then(response=>{
            if (response.data.success){
                this.setState({articles:response.data.articles});
            }else {
                this.setState({message: response.data.msg })
                
            }
        });
    }
   
    render () {
        // console.log("ViewMyArticle")
        const {articles}=this.state;
        const {articleNew, user}=this.props;
        let articleAdded=articleNew;
       
            if(articleAdded.length!==0){
                articleAdded.forEach(element => {
                    articles.push(element);
                });
                articleAdded.length=0;
            }
            return <Row>
                   
                {
                   articles.map(article=> {
                       return <Article article={article} user={user}/>
                   })
            }
            </Row>
    }
}

export {ViewMyArticles}