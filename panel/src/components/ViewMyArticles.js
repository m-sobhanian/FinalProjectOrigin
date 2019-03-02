import React,{Component} from 'react';
import Axios from 'axios';
import {Article} from '../components';
import {Button} from 'react-bootstrap';


class ViewMyArticles extends Component {
    state={
        message:'',
        articles:[]
    }
    view =() => {
const data={};
Axios.post('//localhost:3000/api/user/viewMyArticles',data)
.then(response=>{
    if (response.data.success){
        console.log(response.data.articles)
        this.setState({articles:response.data.articles});
    }else {
        this.setState({message: response.data.msg })
        
    }
});
    }
    
    render () {
        const {articles}=this.state;
        
            return <div>
                    <Button variant="outline-primary" onClick={this.view}>View</Button>
                   
                {
                   articles.map(article=> {
                       return <Article article={article}/>
                   })
            }
            </div>
    }
}

export {ViewMyArticles}