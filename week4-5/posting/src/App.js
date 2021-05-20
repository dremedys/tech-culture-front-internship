import './App.css';
import PostList from "./containers/PostList/PostList";
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import CreatePost from "./containers/CreatePost/CreatePost";
import Post from "./containers/Post/Post";
import Navigation from "./components/Navigation/Navigation";
class App extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Switch>
                    <Route path="/" component={PostList} exact/>
                    <Route path="/create_post" component={CreatePost} exact/>
                    <Route path="/posts/:id" component={Post}/>
                    <Redirect to="/" />
                </Switch>
            </div>

        )
    }
}

export default withRouter(connect()(App))

