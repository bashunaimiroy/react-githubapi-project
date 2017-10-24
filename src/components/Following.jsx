import React, { Component } from "react"
import Infinite from "react-infinite"
import GithubUser from "./GithubUser.jsx"
// import { BrowserRouter, Route, Link} from 'react-router-dom';

class Following extends Component {
    constructor(props) {
        super(props);
        this.state = { following: [], page: 1, loading: false, endOfResults:false }
        // var setState=this.setState.bind(this)
    }
    fetchData() {
        //tells <infinite> to start spinning that spinner!
        this.setState({ loading: true })
        console.log("fetching following from github api!")
        //makes an HTTP request to the API for user's followers, 
        //using our api Token and specifying the page we want
        fetch(`https://api.github.com/users/${this.props.username}/following?access_token=${this.props.token}&page=${this.state.page}&per_page=50`)
            .then(response => response.json())
            .then(results => {
                if (results.length === 0
                    || !Array.isArray(results)) {
             //checks if we're getting an empty array or something that isn't an array
             // back, tells <infinite> to stop beating a dead horse by
            //setting this.state.endOfResults to true
                    console.log("it's the end of results as we know it!")
                    this.setState({ endOfResults: true })
                }
                else {
                    //but if we're still getting results, concatenate them to the state array,
                //flip the page for the next request we make,
                //and tell <infinite> to turn off that loading spinner cause we've got results.
                    console.log("more results from GitHub!")
                    this.setState(
                        st => ({
                            following: st.following.concat(results),
                            page: st.page + 1,
                            loading: false
                        }))
                }
            }
            )
    }

    render() {
        return (
            <div className="following-page">
                <h3>Users {this.props.username} is following</h3>
                <Infinite
                    isInfiniteLoading={this.state.loading}
                    onInfiniteLoad={this.fetchData}
                    infiniteLoadBeginEdgeOffset={
                        //if we're at the end of results, stop beating a dead horse,
                        //sets infiniteLoadBeginEdgeOffset to undefined which effectively
                        //turns off infinite scroll. Otherwise it's 100 pixels above the bottom.
                        this.state.endOfResults ? undefined : 100
                    }
                    useWindowAsScrollContainer
                    elementHeight={39}
                    loadingSpinnerDelegate=
                    {<div className="little-message">loading the people {this.props.username} is following...
                </div>}
                >
                    {this.state.followers.map((user) => <GithubUser user={user} key={user.login} />)}
                </Infinite>
                {this.state.endOfResults ? <div className="little-message">end of results.</div> : <div></div>}
            </div>)
    }
}
export default Following;