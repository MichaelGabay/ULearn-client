import React, { useEffect, useState } from "react";
import { GET_MY_COURSES_ROUTE } from "../../../shared/constant/url";
import { apiGet } from "../../../shared/services/services";
import style from "./myCourses.module.css";
import { BoxCourse } from "./boxCourse";
import AuthUser from "../../../shared/components/auth/authUser";
import CircularProgress from '@mui/material/CircularProgress';

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

  return (
    <>
      {loading ? 
          <CircularProgress sx={{position:'absolute',right:'50%',left:'50%',top:'50%',bottom:'50%'}} size={50}/>
        :
        <div className={`${style.container} py-5`}>
          <AuthUser />
          {myCourses?.length > 0 ?
            myCourses.length > 0 && myCourses.map((item) => (
              <BoxCourse key={item._id} course={item} render={getMyCourses} />
            )) :!loading&&<h1 className="text-center">טרם יצרת קורס</h1>
          }
        </div>}
    </>
  );
};

export default MyCourses;
