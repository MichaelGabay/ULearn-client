import {
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  Grid,
  Input,
  ThemeProvider,
  Typography,
} from "@mui/material";
import style from "./home.module.css";
import { blueGrey, cyan, grey, lightGreen, red, yellow } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  GET_COURSES_ROUTE,
  GET_MY_LERNING_ROUTE,
  GET_THE_HOT_COURSE_ROUTE,
  SEARCH_COURSES_ROUTE,
} from "../shared/constant/url";
import { apiGet } from "../shared/services/services";
import CourseBox from "./course/courseBox";
import { useSelector } from "react-redux";
import { SwiperSlideX } from "../shared/components/swiper/swiperSlide";
import { FaSearch, FaUndo } from 'react-icons/fa'
const custom = createTheme({
  palette: {
    primary: {
      main: grey["400"],
    },
    secondary: {
      main: grey["900"],
    },
    error: {
      main: red["A200"],
    },
    success: {
      main: blueGrey["A700"],
    },
    info: {
      main: grey["A100"],
    },
  },
});
const ariaLabel = { 'aria-label': 'description' };

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [query] = useSearchParams();
  const [courseOfTheWeek, setCourseOfTheWeek] = useState({});
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  const [slider, setSlider] = useState(mediaQuery.matches ? 2 : 4);
  const [searching, setSearching] = useState(false);
  const [myLearning, setMyLearning] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const { user } = useSelector((store) => store.userReducer);
  const nav = useNavigate();


  //listen to media query js
  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener("change", (e) => {
      if (e.matches) setSlider(4);
      else {
        setSlider(2);
      }
    });
  }, [slider]);

  useEffect(() => {
    if (user) getMyLearning();
  }, [user]);

  //get my learning Courses
  const getMyLearning = async () => {
    const { data } = await apiGet(GET_MY_LERNING_ROUTE);
    setMyLearning(data);
  };
  // get courses for home page or for search request
  const getCourses = async () => {
    if (!query.get("search")) {
      setSearching(false);
      setCourses([]);
      const page = !query.get("page") ? 1 : query.get("page");
      const { data } = await apiGet(GET_COURSES_ROUTE + "?page=" + page);
      setCourses(data);
      setCourseOfTheWeek((await apiGet(GET_THE_HOT_COURSE_ROUTE)).data);
    } else {
      setSearchLoading(true)
      setCourses([]);
      setSearching(true);
      const { data } = await apiGet(
        SEARCH_COURSES_ROUTE + `?search=${query.get("search")}`
      );
      setCourses(data);
      setSearchLoading(false)

    }
    setLoading(false)
  };
  // searching course
  const searchCourse = () => {
    if (search.length) nav("?search=" + search);
  };
  // searching when the query changes
  useEffect(() => {
    getCourses();
  }, [query]);
  const reset = () => {
    setSearch("");
    nav("/");
  };

  return (
    <div className="pt-4">
      {loading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            right: "50%",
            left: "50%",
            top: "50%",
            bottom: "50%",
          }}
          size={50}
        />
      ) :
        <>
          <div className={style.stripContainer}>
            <div className={style.strip}>
              <div className={style.boxInStrip}>
                <div>
                  <h2>לימודים בשבילך</h2>
                  <p>כאן תוכל לפתח יכולות למידה ולהתחיל ללמוד מקורסים חדשים</p>
                </div>
              </div>
            </div>
          </div>
          {searchLoading && <CircularProgress
            sx={{
              position: "absolute",
              right: "50%",
              left: "50%",
              top: "50%",
              bottom: "50%",
            }}
            size={50}
          />}
          <ThemeProvider theme={custom}>
            <Container dir="rtl" maxWidth={"lg"}>
              <div className={"col-md-3 d-flex" + style.input}>

                <Input sx={{ fontSize: '20px', paddingLeft: '10%' }} onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.target.value == "") {
                      nav("/")
                    }
                    else
                      searchCourse();
                  }
                }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="חפש קורס..." inputProps={ariaLabel} />


                <FaSearch

                  onClick={() => searchCourse()} style={{ cursor: 'pointer' }} />

                <FaUndo
                  className="mx-2"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    reset();
                    e.stopPropagation();
                  }}
                />
              </div>
            </Container>
            {searching ? (
              <>
                <Container maxWidth={"lg"}>
                  {!courses.length && !searchLoading ? (
                    <h2 className="text-end mt-2">לא נמצא קורס מבוקש</h2>
                  ) : (
                    <Box sx={{ direction: "rtl" }} paddingY={5}>
                      <Grid
                        container
                        spacing={{ xs: 2, md: 2 }}
                        columns={{ xs: 1, sm: 3, md: 5 }}
                      >
                        {query.get("search") &&
                          courses &&
                          courses?.map((course) => (
                            <Grid
                              item
                              key={course._id}
                              xs={1}
                              sm={1}
                              md={1}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <CourseBox course={course} />
                            </Grid>
                          ))}
                      </Grid>
                    </Box>
                  )}
                </Container>
              </>
            ) : (
              <Container maxWidth={"lg"}>
                {user?.myLearning?.length > 0 && (
                  <div className={"pt-5 py-md-5 " + style.showHideSlider}>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Button
                        onClick={() => nav("/myLearning")}
                        variant="text"
                        color="success"
                      >
                        למעבר ללימודים שלי
                      </Button>
                      <Typography variant="h5" gutterBottom>
                        הלימודים שלי
                      </Typography>
                    </div>
                    <div className={style.swiperSlideX + " h-100"}>
                      <SwiperSlideX data={myLearning} slider={slider} />
                    </div>
                  </div>
                )}
                {courseOfTheWeek && (
                  <div className={style.paddingCourseOfTheWeek}>
                    <div dir="rtl" className="pt-4">
                      <h1 className={style.courseOfWeekH + " pb-4"}>קורס השבוע</h1>
                      <div className={style.courseOfTheWeek + " row"}>
                        <div className="p-4  d-flex flex-column ">
                          <h1>{courseOfTheWeek.name}</h1>
                          <p>קורס זה נבחר כקורס השבוע ומומלץ בשבילך</p>
                          <Button
                            onClick={() =>
                              nav(`course?shortId=${courseOfTheWeek.short_id}`)
                            }
                            variant="contained"
                            color="success"
                            className={"mt-auto ms-auto mb-5 " + style.btnWeek}
                            sx={{ padding: "10px 40px" }}
                          >
                            לקורס זה לחץ כאן
                          </Button>
                        </div>
                        <div className="overflow-hidden p-4 ">
                          <div
                            className="w-100 h-100"
                            style={{
                              backgroundImage: `url(${courseOfTheWeek.img_url})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {courses?.map(((item, i) => (
                  <Box key={i} sx={{ direction: "rtl" }} paddingY={5}>
                    <Typography variant="h4" gutterBottom>
                      {item.categoryName}
                    </Typography>
                    <Grid
                      container
                      spacing={{ xs: 4, md: 2 }}
                      columns={{ xs: 2, sm: 3, md: 5 }}
                    >
                      {item?.courses.map((course) => (
                        <Grid
                          item
                          key={course.short_id}
                          xs={1}
                          sm={1}
                          md={1}
                          display={"flex"}
                          justifyContent={"center"}
                        >
                          <CourseBox course={course} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                )))}
              </Container>
            )}
          </ThemeProvider>
        </>}
    </div>
  );
};

export default Home;
