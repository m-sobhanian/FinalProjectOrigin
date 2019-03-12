import React,{Component} from 'react';
import Axios from 'axios';
import {Article} from '.';
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
    deleteArticle = (idArticle) => {
        let {articles}= this.state;
        const {deleteA}=this.props;
        articles=articles.filter(value=>{
            return value._id!==idArticle
        })
        deleteA(idArticle);
        this.setState({articles});
    }

    editArticle = (result) => {
        let {articles}= this.state;
        let {editA}= this.props;

        articles=articles.map(article=>{
            if(article['_id']===result['_id']){
               
               return result;
            }
            return article;
        })
        editA(result);
        this.setState({articles});
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
                       return <Article article={article} user={user} deleteArticle={this.deleteArticle} editArticle={this.editArticle}/>
                   })
            }
            </Row>
    }
}

export {ViewMyArticles}