import React, { Component } from "react"
import Infinite from "react-infinite"
import GithubUser from "./GithubUser.jsx"
// import { BrowserRouter, Route, Link} from 'react-router-dom';

class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = { followers: [], page: 1, loading: false }
        // var setState=this.setState.bind(this)
        this.apiToken = "e17d3b3493a51ceefd3b416f77f2e3b4c638c1e2"
        this.loadingProgress = 0;

    }

    fetcheroonie = () => {
        this.loading = true;
        console.log("fetching!")
        console.log(this.props);
        this.loadingProgress = 30;
        fetch(`https://api.github.com/users/${this.props.username}/followers?access_token=${this.apiToken}&page=${this.state.page}&per_page=50`)
            .then(response => { this.loadingProgress = 60; return response.json() })
            .then(results => {
                this.loadingProgress = 100;
                this.setState(
                    st => ({
                        followers: st.followers.concat(results),
                        page: st.page + 1,
                        loading: false
                    })
                    , () => { this.loadingProgress = 0; })
            });
    }

    render() {
        return (
            <div className="followers-page">
                <h3>Followers of {this.props.username}</h3>

                <Infinite
                    isInfiniteLoading={this.state.loading}
                    onInfiniteLoad={this.fetcheroonie}
                    infiniteLoadBeginEdgeOffset={100}
                    useWindowAsScrollContainer elementHeight={39}
                    loadingSpinnerDelegate=
                    {<div style={{ width: 500 + "px", height: 20 + "px" }}>
                        <div className="loader"
                            style={{ width: this.loadingProgress + "%", height: 100 + "%" }}>
                        </div>
                    </div>}
                >
                    {this.state.followers.map((user) => <GithubUser user={user} key={user.login} />)}
                </Infinite>
            </div>)
    }
}
export default Followers;