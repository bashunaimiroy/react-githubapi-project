
import React,{Component} from "react"
import GithubRepo from './GithubRepo.jsx'

// import { BrowserRouter, Route, Link} from 'react-router-dom';

class Repos extends Component{
constructor(props){
    super(props);
    this.state={repos:[]}
    // var setState=this.setState.bind(this)
}
    componentDidMount() {
        console.log(this.props);
        fetch(`https://api.github.com/users/${this.props.username}/repos`)
        .then(response=>response.json())
        .then(results=>{this.setState({repos:results});console.log(results)});
    }
    
    render(){
        return(
<div className="repos-page">
  <h3>repositories by {this.props.username}</h3>
  
  {this.state.repos.map((repo)=><GithubRepo repo={repo} key={repo.id}/>)}
</div>)
}
}
export default Repos;