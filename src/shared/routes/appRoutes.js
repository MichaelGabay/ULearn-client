import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../../components/auth/login';
import Logout from '../../components/auth/logout';
import SignUp from '../../components/auth/signUp';
import CreateCourse from '../../components/createCourse/createCourse';
import Home from '../../components/Home';
import ShowCourse from '../../components/myCourses/editCourse/showCourse';
import MyCourses from '../../components/myCourses/myCourses';
import Layout from '../layout/layout';
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signUp' element={<SignUp />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/createCourse' element={<CreateCourse />} /> 
                    <Route path='/myCourses' element={<MyCourses />} />
                    <Route path='/showCourse' element={<ShowCourse />} />

                </Route>
                <Route path='/*' element={<h1>404</h1>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes