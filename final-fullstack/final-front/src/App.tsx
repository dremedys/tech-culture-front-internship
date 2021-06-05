import * as React from "react";
import './App.css';
import { useSelector} from "react-redux";
import {RootState} from "./store/reducers/rootReducer";
import Navigation from "./components/Navigation/Navigation";
import { Route } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import About from "./components/About/About";
import Feed from "./components/Feed/Feed";
import UserProfile from "./components/UserProfile/UserProfile";
import PostDetail from "./components/PostDetail/PostDetail";
function App() {

    const isLogged = useSelector( ( (state: RootState) => state.auth.isLogged))


    return (
        <div className="App">
            <Navigation/>
            <div>
                    <Route path="/" component={Feed} exact/>
                    {isLogged? <Route path="/create_post" component={CreatePost} exact/>: null}
                    <Route path="/about" component={About} exact/>
                    <Route path="/users/:id" component={UserProfile}/>
                    <Route path="/posts/:id" component={PostDetail}/>
            </div>

        </div>
      );
}

export default App;
