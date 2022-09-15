import React, { useEffect, useState } from 'react'
import AuthUser from '../../shared/components/auth/authUser'
import { CircularProgress, Box, Container, Grid } from "@mui/material";
import CourseMyLearning from './courseMyLearning';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../shared/redux/features/userSlice';
import { getMyLearning } from '../../shared/redux/features/myLearningSlice';
import { display, fontSize } from '@mui/system';

export default function MyLearning() {
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.userReducer)
  const { wishList } = useSelector((store) => store.wishListReducer);
  const { myLearning } = useSelector(state => state.myLearningReducer)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    window.scrollTo(0, 0);
    getMyLearningCourses()
    dispatch(getUser())
  }, []);

  const getMyLearningCourses = async () => {
    await dispatch(getMyLearning());
    setLoading(false)
  }
  const loadingStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100vh",
    zIndex: "5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <>
      <Container className="myLearning-container">
        <AuthUser />
        <Grid container spacing={2}>
          {loading && myLearning ?
            <Box sx={loadingStyle}>
              <CircularProgress size={50}
              />
            </Box>
            : <>
              {myLearning?.map((course) => <CourseMyLearning key={course._id} course={course} wishList={wishList} />)}
            </>
          }

        </Grid>
      </Container>
    </>
  );
}
