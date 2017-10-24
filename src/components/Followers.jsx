import React,{Component} from "react"
import GithubUser from "./GithubUser.jsx"
// import { BrowserRouter, Route, Link} from 'react-router-dom';

class Followers extends Component{
constructor(props){
    super(props);
    this.state={followers:[]}
    // var setState=this.setState.bind(this)
}
    componentDidMount() {
        console.log("Followers component mounted. props follow:")
        console.log(this.props);
        fetch(`https://api.github.com/users/${this.props.username}/followers`)
        .then(response=>response.json())
        .then(results=>this.setState({followers:results}));
    }
    
    render(){
        return(
<div className="followers-page">
  <h3>Followers of {this.props.username}</h3>
  
  {this.state.followers.map((user)=><GithubUser user={user} key={user.login}/>)}
</div>)
}
}
export default Followers;