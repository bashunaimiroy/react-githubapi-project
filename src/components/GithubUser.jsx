import React, { Component } from "react"
import { Link } from "react-router-dom"


class GithubUser extends Component {
    render() {
        return (<div className="GithubUser">
            <Link to={`/user/${this.props.user.login}`}>
                <img src={this.props.user.avatar_url} alt={`${this.props.user.login}'s avatar`} />
                {this.props.user.login}
            </Link></div>)
    }
}
export default GithubUser;