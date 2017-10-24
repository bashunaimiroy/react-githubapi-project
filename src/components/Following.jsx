import React,{Component} from "react"
import GithubUser from "./GithubUser.jsx"
// import { BrowserRouter, Route, Link} from 'react-router-dom';

class Following extends Component{
constructor(props){
    super(props);
    this.state={following:[]}
    // var setState=this.setState.bind(this)
}
    componentDidMount() {
        console.log("Following component mounted. props follow:")
        console.log(this.props);
        fetch(`https://api.github.com/users/${this.props.username}/following`)
        .then(response=>response.json())
        .then(results=>this.setState({following:results}));
    }
    
    render(){
        return(
<div className="following-page">
  <h3>Following {this.props.username}</h3>
  
  {this.state.following.map((user)=><GithubUser user={user} key={user.login}/>)}
</div>)
}
}
export default Following;