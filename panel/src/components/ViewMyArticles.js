import React,{Component} from 'react';
import Axios from 'axios';
import {Article} from '../components';


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
        const {articleArray}=this.props;
        let articleAdded=articleArray;
       
            if(articleAdded.length!==0){
                articleAdded.forEach(element => {
                    articles.push(element);
                });
                articleAdded.length=0;
            }
            return <div>
                   
                {
                   articles.map(article=> {
                       return <Article article={article}/>
                   })
            }
            </div>
    }
}

export {ViewMyArticles}