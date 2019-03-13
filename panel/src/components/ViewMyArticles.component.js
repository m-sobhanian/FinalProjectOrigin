import React,{Component} from 'react';
import Axios from 'axios';
import {Article} from '.';
import {Row} from 'react-bootstrap';

class ViewMyArticles extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:'',
            articles:[],
            currentPage: 1,
            todosPerPage: 2
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

    handleClick=(event)=> {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    render () {
        // console.log("ViewMyArticle")
        let {articles, currentPage, todosPerPage}=this.state;
       

        const {articleNew, user, idArtDelete}=this.props;

        let articleAdded=articleNew;

       if(user['role']==='admin'){
        if(idArtDelete.length>0){
            idArtDelete.forEach(id=> {
                articles=articles.filter(article=> {
                    return article._id!==id;
                })
            })
            
            
        }
       }
       
       
            if(articleAdded.length!==0){
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
                       return <Article article={article} user={user} deleteArticle={this.deleteArticle} editArticle={this.editArticle}/>
                   })
            }
           
            </Row>
            <ul id="page-numbers">
            {renderPageNumbers}
            </ul>
            </>
    }
}

export {ViewMyArticles}