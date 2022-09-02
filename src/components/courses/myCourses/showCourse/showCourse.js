import { Button, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { GET_COURSE } from "../../../../shared/constant/url";
import { apiGet } from "../../../../shared/services/services";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey, grey, lightGreen, lime, red } from "@mui/material/colors";
import AuthUser from "../../../../shared/components/auth/authUser";
import AddLesson from "./addLesson";
import EditLesson from "./editLesson";
import { LessonsInScroll } from "./lessonsInScroll";
import EditCourse from "./editCourse";
import { FaEdit, FaPlus } from "react-icons/fa";
const custom = createTheme({
  palette: {
    primary: {
      main: grey["900"],
    },
    secondary: {
      main: grey["200"],
    },
    error: {
      main: red["A200"],
    },
    success: {
      main: blueGrey[800],
    },
    info: lime,
  },
});
const ShowCourse = () => {
  const [query] = useSearchParams();
  const [lessons, setLessons] = useState([]);
  const [courseInfo, setCourseInfo] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditCourseInfo, setShowEditCourseInfo] = useState(true);
  const [lesson, setLesson] = useState({});
  const [itemDragg, setItemDragg] = useState(-1);
  const [itemOver, setItemOver] = useState(-1);
  const [isDownOrUp,setIsDownOrUp]=useState(false)
  let sy;
  useEffect(() => {
    getCourseData(query.get("shortId"));
  }, []);

  const getCourseData = async (shortId) => {
    let { data } = await apiGet(GET_COURSE + `?shortId=${shortId}`);
    setLessons(data.lessons);
    setCourseInfo({
      name: data.name,
      price: data.price,
      info: data.info,
      img_url: data.img_url,
      categoryInSelect: {
        value: data.categoryShortId,
        label: data.categoryName,
      },
      categoryShortId: data.categoryShortId,
    });
  };
  // display function
  const onAddClick = () => {
    setShowAdd(true);
    setShowEdit(false);
    setShowEditCourseInfo(false);
  };
  const onLessonCick = (leeson) => {
    setShowAdd(false);
    setShowEdit(true);
    setLesson(leeson);
    setShowEditCourseInfo(false);
  };

  const onEditCourseCick = () => {
    setShowEditCourseInfo(true);
    setShowEdit(false);
    setShowAdd(false);
  };

  return (
    <div className="d-flex flex-row-reverse">
      <AuthUser />
      <div style={{ height: "70vh", background: "#eeeeee" }}>
        <List
          sx={{
            width: 360,
            maxWidth: "500px",
            bgcolor: "#eeeeee",
            position: "relative",
            overflow: "auto",
            maxHeight: "62vh",
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {lessons.map((item, index) => (
            <LessonsInScroll
              key={item._id}
              lesson={item}
              onLessonCick={onLessonCick}
              index={index}
              lessons={lessons}
              setLessons={setLessons}
              itemDragg={itemDragg}
              setItemDragg={setItemDragg}
              itemOver={itemOver}
              setItemOver={setItemOver}
              isDownOrUp={isDownOrUp}
              setIsDownOrUp={setIsDownOrUp}
              sy={sy}
            />
          ))}
        </List>

        <div style={{ background: "#eeeeee" }} className="text-center p-2 mt-3">
          <Button
            className="mx-2 p-2"
            onClick={() => {
              onAddClick();
            }}
            variant="contained"
            sx={{ fontSize: "1em", margin: 0 }}
          >
            <FaPlus />
          </Button>
          <Button
            className="mx-2 p-2"
            onClick={() => {
              onEditCourseCick();
            }}
            color="info"
            variant="contained"
            sx={{ fontSize: "1em", margin: 0 }}
          >
            <FaEdit />
          </Button>
        </div>
      </div>
      {showEditCourseInfo && <EditCourse courseInfo={courseInfo} />}
      {showEdit && (
        <EditLesson
          lesson={lesson}
          render={getCourseData}
          setShowEdit={setShowEdit}
        />
      )}
      {showAdd && <AddLesson render={getCourseData} setShowAdd={setShowAdd} />}
    </div>
  );
};

export default ShowCourse;
