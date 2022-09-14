import React, { useEffect, useState } from 'react'
import AuthUser from '../../shared/components/auth/authUser'
import { GET_MY_LERNING_ROUTE } from '../../shared/constant/url';
import { apiGet } from '../../shared/services/services';
import { CircularProgress, createTheme, Container, Grid } from "@mui/material";
import { amber, blue, grey, lime, pink, red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import CourseMyLearning from './courseMyLearning';
import { useSelector } from 'react-redux';

export default function MyLearning() {
  const nav = useNavigate();
  const { user } = useSelector(store => store.userReducer)
  // console.log(user)
  const [myLearning, setMyLearning] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getMyLearning();
    window.scrollTo(0, 0);
  }, []);
  //get my learning Courses
  const getMyLearning = async () => {
    const { data } = await apiGet(GET_MY_LERNING_ROUTE);
    setMyLearning(data);
    setLoading(false)
  };

  return (
    <Container className="myLearning-container">
      <Grid container spacing={2}>
        {myLearning?.map((course) => <CourseMyLearning key={course._id} myLearning={user.myLearning} course={course} />)}
      </Grid>
    </Container>
  );
}
