import React,{Component} from 'react';
import Axios from 'axios';
import {AllArticle} from '../components';
import {Row } from 'react-bootstrap';

class ViewAllArticles extends Component {
  constructor(props) {
    super(props);
    this.state={
        message:'',
        articles:[],
        isReadMore: false,
        isAllow:true
    }        
    const data={};
    Axios.post('//localhost:3000/api/user/viewAllArticles',data)
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
    const {deleteArt}=this.props;
    articles=articles.filter(value=>{
        return value._id!==idArticle
    })
    deleteArt(idArticle);
    this.setState({articles});
}

render () {

    let {articles}=this.state;
    let {aN, user, idA, ArtEdited}=this.props;

    let articleAdded=aN;

    if(!isEmpty(ArtEdited)){
        articles=articles.map(article=>{
            if(article['_id']===ArtEdited['_id']){
               return ArtEdited;
            }
            return article;
        })
    }
        if(idA.length!==0){
            

            articles=articles.filter(value=> {
                return value._id!==idA;
            })
          
        }
        if(articleAdded.length!==0)
        {

            articleAdded.forEach(element => {
                articles.push(element);
            });
            articleAdded.length=0;
        }

        return <Row>
            {
               articles.map(article=> {
                 return <AllArticle article={article} user={user} deleteArticle={this.deleteArticle}/>
            
               })
        }
        </Row>
}
}

export {ViewAllArticles};

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}