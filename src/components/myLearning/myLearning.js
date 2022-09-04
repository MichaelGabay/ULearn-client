import React, { useEffect, useState } from 'react'
import AuthUser from '../../shared/components/auth/authUser'
import { GET_MY_LERNING_ROUTE } from '../../shared/constant/url';
import { apiGet } from '../../shared/services/services';
import style from "../myCourses/myCourses.module.css"
import { Button, CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { amber, blue, grey, lime, pink, red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import noImagCoursePic from "../../assets/images/coursePage/noImageCourse.webp"


export default function MyLearning() {
  const nav = useNavigate();
  const custom = createTheme({
    palette: {
      primary: amber,
      secondary: {
        main: pink["A200"],
      },
      error: {
        main: red["A200"],
      },
      success: {
        main: grey[900],
      },
      info: {
        main: blue['500']
      },
    },
  });
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
    <ThemeProvider theme={custom}>
      <AuthUser />
      {!loading ?
        <div className={`${style.container} py-5`}>
          {myLearning.length > 0 ? myLearning.map((item) => (
            <div
              key={item._id}
              style={{ direction: "rtl" }}
              className={`mt-2 mt-md-0  d-flex flex-md-row   flex-column   justify-content-md-between ${style.course}`}
            >
              <div className="p-2   d-md-flex flex-column  align-items-center   col-md-auto col-12">

                <div className="d-flex">
                  <Button
                    onClick={() => nav(`/course?shortId=${item.short_id}`)}
                    variant="contained"
                    color="info"
                  >
                    לקורס- {item.name}
                  </Button>
                </div>

              </div>
              <div className={` col-lg-4 col-md-6 ${style.imgWidth}`}>
                <div
                  style={{ backgroundImage:item.img_url? `url(${item.img_url})`:`url(${noImagCoursePic})` }}
                  className={`${style.imgCourse}`}
                ></div>
              </div>
            </div>
          )) : <h1 className="text-center">טרם קנית קורס</h1>}

        </div>
        : <CircularProgress sx={{ position: 'absolute', right: '50%', left: '50%', top: '50%', bottom: '50%' }} size={50} />
      }
    </ThemeProvider>
  );
}
