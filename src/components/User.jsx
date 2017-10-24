import React from 'react';
import { Link, Route } from 'react-router-dom';
import Followers from './Followers.jsx'
import Following from './Following.jsx'
import Repos from './Repos.jsx'

import {GithubApiToken} from './Data.jsx'

class User extends React.Component {
    constructor() {
        super();
        this.state = {};
        console.log(GithubApiToken)
    }

    /*
    This method will be called by React after the first render. It's a perfect place to load
    data with AJAX. This User component gets mounted in the DOM as soon as the URL is /user/:username

    When that happens, react-router will pass a `params` prop containing every parameter in the URL, just like
    when we get URL parameters in Express with req.params. Here, it's this.props.params. Since we called our route
    parameter `username`, it's available under this.props.params.username

    We're using it to make an API call to GitHub to fetch the user data for the username in the URL. Once we receive
    the data -- in the callback -- we call `setState` to put the user data in our state. This will trigger a re-render.
    When `render` gets called again, `this.state.user` exists and we get the user info display instead of "LOADING..."
    */
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.username !== this.props.username) {
            this.fetchyMcGee()
        }
    }
    componentDidMount() {
        this.fetchyMcGee();
    }

    fetchyMcGee = () => {
        fetch(`https://api.github.com/users/${this.props.username}?access_token=${GithubApiToken}`)
            .then(response => response.json())
            .then(
            user => {
                // How can we use `this` inside a callback without binding it??
                // Make sure you understand this fundamental difference with arrow functions!!!
                this.setState({
                    user: user
                });
            }
            );
    }

    /*
    This method is used as a mapping function. Eventually this could be factored out to its own component.
    */
    renderStat(stat) {
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    }

    render() {
        // If the state doesn't have a user key, it means the AJAX didn't complete yet. 
        //Simply render a LOADING indicator.
        if (!this.state.user) {
            return (<div className="user-page">LOADING...</div>);
        }

        // If we get to this part of `render`, then the user is loaded
        const user = this.state.user;

        // Gather up some number stats about the user, to be used in a map below
        const stats = [
            {
                name: 'Public Repos',
                value: user.public_repos,
                url: `/user/${this.props.username}/repos`
            },
            {
                name: 'Followers',
                value: user.followers,
                url: `/user/${this.props.username}/followers`
            },
            {
                name: 'Following',
                value: user.following,
                url: `/user/${this.props.username}/following`
            }
        ];

        // Look in index.css for the styles that make this look like it does
        return (
            <div className="user-page">

                <div className="user-info">

                    <Link className="user-info__text" to={`/user/${user.login}`}>
                        <img className="user-info__avatar" src={user.avatar_url} alt={`${user.login} avatar`} />
                        <h2 className="user-info__title">{user.login} ({user.name})</h2>
                        <p className="user-info__bio">{user.bio}</p>
                    </Link>

                    <ul className="user-info__stats">
                        {stats.map(this.renderStat)}
                    </ul>
                </div>
                <Route path={`/user/${this.props.username}/followers`} render={() => { return <Followers username={this.props.username} token={GithubApiToken}/> }} />
                <Route path={`/user/${this.props.username}/following`} render={() => { return <Following username={this.props.username} token={GithubApiToken}/> }} />
                <Route path={`/user/${this.props.username}/repos`} render={() => { return <Repos username={this.props.username} token={GithubApiToken}/> }} />
            </div>
        );
    }
};

export default User;
