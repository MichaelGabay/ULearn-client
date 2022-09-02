import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../../components/auth/login';
import SignUp from '../../components/auth/signUp';
import Home from '../../components/Home';
import Layout from '../layout/layout';
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signUp' element={<SignUp />} />
                </Route>
                <Route path='/*' element={<h1>404</h1>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes