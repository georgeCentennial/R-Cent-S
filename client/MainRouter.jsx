import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './core/Home';
import LandingPage from './pages/LandingPage';
import FeedPage from './pages/FeedPage';
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Profile from './user/Profile.jsx'
import EditProfile from './user/EditProfile.jsx'
import Signin from './lib/Signin.jsx'
import PrivateRoute from './lib/PrivateRoute.jsx'
import Menu from './core/Menu'
import Comments from './comment/comment.jsx'
import Usercomment from './comment/usercomment.jsx'
import Editcomment from './comment/editcomment.jsx'
import Deletecomment from './comment/deletecomment.jsx'


// everything you dictate here is the route for all

function MainRouter() {
    return (
    <div>
        <Menu/>
        <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route exact path="/feed" element={<FeedPage/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/users/edit/:userId" element={<PrivateRoute><EditProfile /></PrivateRoute>}/>
            <Route path="/users/:userId" element={<Profile />} /> 
            <Route path="/comment" element={<Comments/>}/> 
            <Route path="/usercomment/:commentId" element={<Usercomment />} />

            <Route path="/editcomment" element ={<Editcomment/>}/>
            <Route path="/deletecomment" element ={<Deletecomment/>}/>


        </Routes>
    </div>
    )
}

export default MainRouter;