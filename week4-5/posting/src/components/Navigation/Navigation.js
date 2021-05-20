import React from "react";
import {NavLink} from "react-router-dom";
import classes from './Navigation.module.css'
const Navigation = () => {
    return (
        <nav className={classes.Navigation}>
            <ul>
                <li>
                    <NavLink to={'/'}  activeClassName={classes.active} exact>
                        Feed
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/create_post'}  activeClassName={classes.active} exact>
                        Create a post
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
