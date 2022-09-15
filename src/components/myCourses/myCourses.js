import React, { useEffect, useState } from "react";
import { GET_MY_COURSES_ROUTE } from "../../shared/constant/url";
import { apiGet } from "../../shared/services/services";
import style from "./myCourses.module.css";
import { BoxCourse } from "./boxCourse";
import AuthUser from "../../shared/components/auth/authUser";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getMyCourses();
    window.scrollTo(0, 0);
  }, []);

  //get my Courses
  const getMyCourses = async () => {
    setLoading(true)
    const { data } = await apiGet(GET_MY_COURSES_ROUTE);
    setMyCourses(data);
    setLoading(false)
  };
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
      {loading ?
        <Box sx={loadingStyle}>
          <CircularProgress size={50}
          />
        </Box>
        :
        <div className={`${style.container} py-5`}>
          <AuthUser />
          {myCourses?.length > 0 ?
            myCourses.length > 0 && myCourses.map((item) => (
              <BoxCourse key={item._id} course={item} render={getMyCourses} />
            )) : !loading && <h1 className="text-center">טרם יצרת קורס</h1>
          }
        </div>}
    </>
  );
};

export default MyCourses;
