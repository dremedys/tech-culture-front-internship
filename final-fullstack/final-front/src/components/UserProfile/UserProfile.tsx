import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {fetchUserPosts} from "../../store/actions/posts";
import Posts from "../Posts/Posts";
import {Link, useRouteMatch} from 'react-router-dom';
import UserCard from "./UserCard/UserCard";
import Spinner from "../Spinner/Spinner";
import {fetchUserProfile, resetUserProfile} from "../../store/actions/profile";

const UserProfile = () => {
    const match = useRouteMatch();
    // @ts-ignore
    const  id = match.params.id

    const dispatch = useDispatch()
    const posts = useSelector( ( (state: RootState) => state.posts.posts))
    const loadingPosts = useSelector( ( (state: RootState) => state.posts.loadingPosts))
    const profile = useSelector( ( (state: RootState) => state.profile.profile))
    const profileError = useSelector( ( (state: RootState) => state.profile.profileError))
    const loadingProfile = useSelector( ( (state: RootState) => state.profile.profileLoading))
    const loading = loadingPosts || loadingProfile

    useEffect(() => {
        dispatch(fetchUserPosts(id));
    },[dispatch,id])

    useEffect(() => {
        dispatch(fetchUserProfile(id))

        return () => {
            dispatch(resetUserProfile())
        }
    }, [dispatch,id])

    if ( !loading || !profile)
        return (
            <div style={{marginTop:30}}>
                <Link to={'/'}> {'<'} Go back </Link>
                <UserCard
                    profileError={profileError}
                    profile={profile}/>
                <Posts posts={posts} loading={loading}/>
            </div>
        )
    else
        return <Spinner/>


}

export default UserProfile
