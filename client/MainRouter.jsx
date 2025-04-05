import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './core/Home';
import LandingPage from './pages/LandingPage';
import FeedPage from './pages/FeedPage';
// everything you dictate here is the route for all

function MainRouter() {
    return (
    <div>
        <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route exact path="/feed" element={<FeedPage/>} />
        </Routes>
    </div>
    )
}

export default MainRouter;