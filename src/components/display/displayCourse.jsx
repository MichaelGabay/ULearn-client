import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GET_COURSE } from "../../shared/constant/url";
import { apiGet } from "../../shared/services/services";
import { useSelector } from "react-redux";
import style from "./displayCourse.module.css";
import LessonInScroll from "./lessonInScroll";
import { Tab, TabPanel, TabList, Tabs } from "react-tabs";
import "./reactTabs.css";
import AuthUser from "../../shared/components/auth/authUser";
import Questions from "./questions";
import { CircularProgress } from "@mui/material";
import AddQ from "./addQ";
import AboutPageCourse from "./aboutPageCourse";
import CommentsQQ from "./commentsQQ";

const DisplayCourse = () => {
  const [query] = useSearchParams();
  const [lessonWhoClickd, setLessonWhoClickd] = useState("");
  const [course, setCourse] = useState();
  const [views, setViews] = useState([]);
  const [isQ, setIsQ] = useState(true);
  const [isAddQ, setIsAddQ] = useState(false);
  const [isCommentsQ, setIsCommentsQ] = useState(false);
  const [questionWhoClickd, setQuestionWhoClickd] = useState({});
  const [lessonIndex, setLessonIndex] = useState(-1);
  const nav = useNavigate();
  const { user } = useSelector((store) => store.userReducer);
  let shortId = query.get("shortId");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    user && getCourse();
  }, [user]);
  // get the course lessons
  const getCourse = async () => {
    try {
      let { data } = await apiGet(GET_COURSE + `?shortId=${shortId}`);
      validateBuying(data.subscribes_users_id);
      setCourse(data);
      updateFirstLesson(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // validate if the course belongs to user
  const validateBuying = (subscribes) => {
    if (!subscribes.find((item) => item == user._id)) {
      nav(`/CoursePage?shortId=${shortId}`);
    }
  };
  // update screen whith the last lesson or first lesson 
  const updateFirstLesson = (data) => {
    let firstIndex = 0;
    let myLearnCourse = user.myLearning.find(
      (item) => item.ShortIdCourse == shortId
    );
    setViews(myLearnCourse.lessonsViewsId);
    if (myLearnCourse.lastLessonViews) {
      data.lessons.forEach((item, i) => {
        if (item.link == myLearnCourse.lastLessonViews) {
          firstIndex = i;
          setLessonWhoClickd(item._id);
        }
      });
    } else {
      if (data.lessons.length > 0) setLessonWhoClickd(data.lessons[0]._id);
    }
    setLessonIndex(firstIndex);
  };
  // views fanction
  const onAddQClick = () => {
    setIsQ(false);
    setIsAddQ(true);
  };
  const onBackToQClick = () => {
    setIsQ(true);
    setIsAddQ(false);
    setIsCommentsQ(false);
  };
  const onCommentsClick = () => {
    setIsQ(false);
    setIsCommentsQ(true);
  };
  return (
    <div >
      {loading && (
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
      )}
      {!loading && (
        <div >
          {!loading && course.lessons.length == 0 ? (
            <h1 className="text-end me-2">אין עדיין שיעורים</h1>
          ) : (
            <div>
              <AuthUser />
              <div dir="rtl" className={style.hideMobileShowComputer}>
                <div className="d-flex  p-0 m-0">
                  <div className={`${style.lessonScroller}`}>
                    <div dir="rtl">
                      {course?.lessons.map((item, i) => (
                        <LessonInScroll
                          index={i}
                          setLessonIndex={setLessonIndex}
                          key={i}
                          lesson={item}
                          views={views}
                          setViews={setViews}
                          setLessonWhoClickd={setLessonWhoClickd}
                          lessonWhoClickd={lessonWhoClickd}
                          onBackToQClick={onBackToQClick}
                          user={user}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col"></div>
                  <div className={style.video}>
                    {course?.lessons.length > 0 && (
                      <iframe
                        width="100%"
                        height="100%"
                        src={course.lessons[lessonIndex].link}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen="allowfullscreen"
                      ></iframe>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div className={style.tabs}>
                    <Tabs direction={"rtl"}>
                      <TabList>
                        <Tab>מידע על השיעור</Tab>
                        <Tab>שאלות ותשובות</Tab>
                      </TabList>
                      <TabPanel>
                        {/* <div style={{ minHeight: "40vh" }} className="px-2"> */}
                        <AboutPageCourse courseInfo={course.lessons[lessonIndex].info} />
                        {/* </div> */}
                      </TabPanel>
                      <TabPanel>
                        {isQ && (
                          <Questions
                            onAddQClick={onAddQClick}
                            showCommentsQ={onCommentsClick}
                            setQuestionWhoClickd={setQuestionWhoClickd}
                            setCourse={setCourse}
                            course={course}
                            lessonIndex={lessonIndex}
                            user={user}
                          />
                        )}
                        {isAddQ && (
                          <AddQ
                            onBackToQClick={onBackToQClick}
                            course={course}
                            lessonIndex={lessonIndex}
                          />
                        )}
                        {isCommentsQ && (
                          <CommentsQQ
                            onBackToQClick={onBackToQClick}
                            questionWhoClickd={questionWhoClickd}
                            setQuestionWhoClickd={setQuestionWhoClickd}
                            lessonIndex={lessonIndex}
                            course={course}
                            setCourse={setCourse}
                          />
                        )}
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>

              <div className={style.hideComputerShowMobile}>
                <div className={style.videoMobile}>
                  {course?.lessons.length > 0 && (
                    <iframe
                      width="100%"
                      height="100%"
                      src={course.lessons[lessonIndex].link}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen="allowfullscreen"
                    ></iframe>
                  )}
                </div>
                <div dir="rtl" className={style.tabs}>
                  <Tabs direction={"rtl"}>
                    <TabList>
                      <Tab>שיעורי הקורס</Tab>
                      <Tab>שאלות ותשובות</Tab>
                      <Tab>מידע על השיעור</Tab>
                    </TabList>
                    <TabPanel>
                      <div className={style.lessonsMobile} dir="rtl">
                        {course?.lessons.map((item, i) => (
                          <LessonInScroll
                            index={i}
                            setLessonIndex={setLessonIndex}
                            key={i}
                            lesson={item}
                            views={views}
                            setViews={setViews}
                            setLessonWhoClickd={setLessonWhoClickd}
                            lessonWhoClickd={lessonWhoClickd}
                            onBackToQClick={onBackToQClick}
                            user={user}
                          />
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      {isQ && (
                        <Questions
                          onAddQClick={onAddQClick}
                          showCommentsQ={onCommentsClick}
                          setQuestionWhoClickd={setQuestionWhoClickd}
                          setCourse={setCourse}
                          course={course}
                          lessonIndex={lessonIndex}
                          user={user}
                        />
                      )}
                      {isAddQ && (
                        <AddQ
                          onBackToQClick={onBackToQClick}
                          course={course}
                          lessonIndex={lessonIndex}
                        />
                      )}
                      {isCommentsQ && (
                        <CommentsQQ
                          onBackToQClick={onBackToQClick}
                          questionWhoClickd={questionWhoClickd}
                          setQuestionWhoClickd={setQuestionWhoClickd}
                          lessonIndex={lessonIndex}
                          course={course}
                          setCourse={setCourse}
                        />
                      )}
                    </TabPanel>
                    <TabPanel>
                      <div style={{ minHeight: "40vh" }} className="px-2">
                        <AboutPageCourse courseInfo={course.lessons[lessonIndex].info} />
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayCourse;
