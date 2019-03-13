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
        isAllow:true,
        currentPage: 1,
        todosPerPage: 2
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

handleClick=(event)=> {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

render () {

    let {articles, currentPage, todosPerPage}=this.state;
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
        if(idA.length>0){
            idA.forEach(id=>{
                articles=articles.filter(value=> {
                    return value._id!==id;
                })
            })
           
          
        }
        if(articleAdded.length!==0)
        {

            articleAdded.forEach(element => {
                articles.push(element);
            });
            articleAdded.length=0;
        }

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = articles.slice(indexOfFirstTodo, indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(articles.length / todosPerPage); i++) {
        pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <li className="colorBtnDark btnClass m-2 px-2 py-1" style={{display:"inline", color:'white', borderRadius:'3px' }}
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </li>
            );
          });


        return <>
         <Row>
            {
               currentTodos.map(article=> {
                 return <AllArticle article={article} user={user} deleteArticle={this.deleteArticle}/>
            
               })
        }
        </Row>
        <ul id="page-numbers">
            {renderPageNumbers}
            </ul>
            </>
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