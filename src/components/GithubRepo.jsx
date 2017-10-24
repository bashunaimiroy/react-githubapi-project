import React, { Component } from "react"


class GithubRepo extends Component {
    render() {
        return (<div className="GithubRepo">
            <a href={`${this.props.repo.html_url}`}>
                {this.props.repo.name}
            </a></div>)
    }
}
export default GithubRepo;