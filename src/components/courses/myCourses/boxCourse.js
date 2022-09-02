import React from "react";
import style from "./myCourses.module.css";

import { DELETE_COURSE_ROUTE } from "../../../shared/constant/url";
import {
  lightGreen,
  amber,
  lime,
  pink,
  green,
  blue,
  red,
  grey,
} from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { apiDelete } from "../../../shared/services/services";
import { Button } from "@mui/material";
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
      main: green[600],
    },
    info: lime,
  },
});

export const BoxCourse = ({ course, render }) => {
  const nav = useNavigate();
  // delete course
  const deleteCourse = async (shortId) => {
    if (window.confirm("בטוח שאתה רוצה למחוק")) {
      await apiDelete(DELETE_COURSE_ROUTE + `?shortId=${shortId}`);
      await render();
    }
  };
  return (
    <div
      style={{ direction: "rtl" }}
      className={`mt-2 mt-md-0  d-flex flex-md-row   flex-column   justify-content-md-between ${style.course}`}
    >
      <div className="p-2   d-md-flex flex-column  align-items-center   col-md-auto col-12">
        <ThemeProvider theme={custom}>
          <div className="d-flex">
            <Button
              onClick={() => nav(`/showCourse?shortId=${course.short_id}`)}
              variant="contained"
              color="success"
            >
              לעריכת הקורס- {course.name}
            </Button>
            <Button
              onClick={() => deleteCourse(course.short_id)}
              className="mx-2"
              variant="contained"
              color="error"
            >
              מחיקה
            </Button>
          </div>
        </ThemeProvider>
      </div>
      <div className={` col-lg-4 col-md-6 ${style.imgWidth}`}>
        <div
          style={{ backgroundImage: `url(${course.img_url})` }}
          className={`${style.imgCourse}`}
        ></div>
      </div>
    </div>
  );
};
