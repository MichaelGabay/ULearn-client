import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../../components/auth/login';
import Logout from '../../components/auth/logout';
import SignUp from '../../components/auth/signUp';
import CoursePage from '../../components/course/coursePage';
import ThankYouOrder from '../../components/course/thankYouOrder';
import CreateCourse from '../../components/createCourse/createCourse';
import DisplayCourse from '../../components/display/displayCourse';
import Favourites from '../../components/favourites/favourites';
import Home from '../../components/home';
import MyAccount from '../../components/myAccount/myAccount';
import ShowCourse from '../../components/myCourses/editCourse/showCourse';
import MyCourses from '../../components/myCourses/myCourses';
import MyLearning from '../../components/myLearning/myLearning';
import Layout from '../layout/layout';
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signUp' element={<SignUp />} />
                    <Route path='/myAccount' element={<MyAccount/>} /> 
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/createCourse' element={<CreateCourse />} /> 
                    <Route path='/myCourses' element={<MyCourses />} />
                    <Route path='/showCourse' element={<ShowCourse />} />
                    <Route path='/myLearning' element={<MyLearning />} />
                    <Route path='/favourites' element={<Favourites/>} />
                    <Route path='/coursePage' element={<CoursePage />} />
                    <Route path='/order/thankYou' element={<ThankYouOrder />} />
                    <Route path='/course' element={<DisplayCourse />} />
                </Route>
                <Route path='/*' element={<h1>404 not found</h1>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes