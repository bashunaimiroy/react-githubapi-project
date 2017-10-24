
import React, { Component } from "react"
import GithubRepo from './GithubRepo.jsx'
import Infinite from "react-infinite"

// import { BrowserRouter, Route, Link} from 'react-router-dom';

class Repos extends Component {
    constructor(props) {
        super(props);
        this.state = { repos: [], page: 1, loading: false, endOfResults: false }
        console.log(props)
        // var setState=this.setState.bind(this)
    }
    fetchyMcFetcherson = () => {
        //tells <infinite> to start spinning that spinner!

        this.setState({ loading: true })
        console.log("fetching user's repos from github API!")
        //makes an HTTP request to the API for user's repos, using our api Token and specifying the page we want
        fetch(`https://api.github.com/users/${this.props.username}/repos?access_token=${this.props.token}&page=${this.state.page}&per_page=50`)
            .then(response => response.json())
            .then(results => {
                console.log(results);
                //checks if we're getting an empty array or object (for 401 and 403) 
                //back, tells <infinite> to stop beating a dead horse by
                //setting this.state.endOfResults to true
                if (
                    results.length === 0
                    || !Array.isArray(results)
                ) {
                    console.log("it's the end of repo results as we know it!")
                    this.setState({ endOfResults: true })
                }
                //but if we're still getting results, concatenate them to the state array,
                //flip the page for the next request we make,
                //and tell <infinite> to turn off that loading spinner cause we've got results.
                else {
                    console.log("more results from GitHub!")
                    this.setState(
                        st => ({
                            repos: st.repos.concat(results),
                            page: st.page + 1,
                            loading: false
                        }))
                }
            })
    }

    render() {
        return (
            <div className="repos-page">
                <h3>repositories by {this.props.username}</h3>
                <Infinite
                    isInfiniteLoading={this.state.loading}
                    onInfiniteLoad={this.fetchyMcFetcherson}
                    infiniteLoadBeginEdgeOffset={
                        //if we're at the end of results, stop beating a dead horse,
                        //sets infiniteLoadBeginEdgeOffset to undefined which effectively
                        //turns off infinite scroll. Otherwise it's 100 pixels above the bottom.
                        this.state.endOfResults ? undefined : 100
                    }
                    useWindowAsScrollContainer
                    elementHeight={18}
                    loadingSpinnerDelegate=
                    {<div className="little-message">loading {this.props.username}'s repos...
                </div>}
                >
                    {this.state.repos.map((repo) => <GithubRepo repo={repo} key={repo.id} />)}
                </Infinite>
                {this.state.endOfResults ? <div className="little-message">end of results dog.</div> : <div></div>}
            </div>)
    }
}
export default Repos;