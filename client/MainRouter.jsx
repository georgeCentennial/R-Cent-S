import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './core/Home';
import LandingPage from './pages/LandingPage';

// everything you dictate here is the route for all

function MainRouter() {
    return (
    <div>
        <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
        </Routes>
    </div>
    )
}

export default MainRouter;