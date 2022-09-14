import React, { useEffect, useState } from 'react'
import AuthUser from '../../shared/components/auth/authUser'
import { GET_MY_LERNING_ROUTE } from '../../shared/constant/url';
import { apiGet } from '../../shared/services/services';
import { CircularProgress, createTheme, Container, Grid } from "@mui/material";
import { amber, blue, grey, lime, pink, red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import CourseMyLearning from './courseMyLearning';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../shared/redux/features/userSlice';
import { getMyLearning } from '../../shared/redux/features/myLearningSlice';

export default function MyLearning() {
  const nav = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.userReducer)
  const { wishList } = useSelector((store) => store.wishListReducer);
  const { myLearning } = useSelector(state => state.myLearningReducer)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getMyLearningCourses()
    window.scrollTo(0, 0);
    dispatch(getUser())
  }, []);

  const getMyLearningCourses = async () => {
    await dispatch(getMyLearning());
    setLoading(false)
  }

  return (
    <Container className="myLearning-container">
      <Grid container spacing={2}>
        {loading && myLearning ?
          <CircularProgress sx={{ position: "absolute", right: "50%", left: "50%", top: "50%", bottom: "50%", }}
            size={50}
          />
          : <>
            {myLearning?.map((course) => <CourseMyLearning key={course._id} myLearning={user?.myLearning} course={course} wishList={wishList} />)}
          </>}

      </Grid>
    </Container>
  );
}




// <ThemeProvider theme={custom}>
// <AuthUser />
// {!loading ?
//   <div className={`${style.container} py-5`}>
//     {myLearning.length > 0 ? myLearning.map((item) => (
//       <div
//         key={item._id}
//         style={{ direction: "rtl" }}
//         className={`mt-2 mt-md-0  d-flex flex-md-row   flex-column   justify-content-md-between ${style.course}`}
//       >
//         <div className="p-2   d-md-flex flex-column  align-items-center   col-md-auto col-12">

//           <div className="d-flex">
//             <Button
//               onClick={() => nav(`/course?shortId=${item.short_id}`)}
//               variant="contained"
//               color="info"
//             >
//               לקורס- {item.name}
//             </Button>
//           </div>

//         </div>
//         <div className={` col-lg-4 col-md-6 ${style.imgWidth}`}>
//           <div
//             style={{ backgroundImage: item.img_url ? `url(${item.img_url})` : `url(${noImagCoursePic})` }}
//             className={`${style.imgCourse}`}
//           ></div>
//         </div>
//       </div>
//     )) : <h1 className="text-center">טרם קנית קורס</h1>}

//   </div>
//   : <CircularProgress sx={{ position: 'absolute', right: '50%', left: '50%', top: '50%', bottom: '50%' }} size={50} />
// }
// </ThemeProvider>
// );