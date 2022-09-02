import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { UPDATE_VIEW_LESSON_ROUTE } from "../../shared/constant/url";
import { apiPost } from "../../shared/services/services";
import { BsCheck2Square, BsSquare } from "react-icons/bs";
import style from "./displayCourse.module.css";
export default function LessonInScroll({
  lesson,
  views,
  setViews,
  setLessonWhoClickd,
  lessonWhoClickd,
  onBackToQClick,
  index,
  setLessonIndex,
  user
}) {
  const [query] = useSearchParams();
  // const { user } = useSelector((store) => store.userReducer);

  const updateView = async () => {
    let resp = await apiPost(
      UPDATE_VIEW_LESSON_ROUTE +
      `?coursShortId=${query.get("shortId")}&lessonId=${lesson._id}`
    );
    if (views.includes(lesson._id)) {
      let viewsAr = [...views].filter((item) => item != lesson._id);
      setViews(viewsAr);
    } else {
      setViews([...views, lesson._id]);
    }
  };
  useEffect(() => {
    
  }, [user])
  return (
    <div
      dir="rtl"
      style={{
        cursor: "pointer",
        display: "flex",
        fontSize: "18px",
        padding: "0 8px",
        height: "55px",
        width: "100%",
        alignItems: "center",
        background: lessonWhoClickd === lesson._id ? "#1c1d1f16" : "none",
      }}
      className={style.lessonHover +" "+ style.lessonMobile}
      onClick={() => {
        window.scrollTo(0, 0);
        updateView();
        setLessonWhoClickd(lesson._id);
        onBackToQClick();
        setLessonIndex(index);
      }}
    >
      <div className="d-flex align-items-center">
        <div>
          {views.includes(lesson._id) ? (
            <BsCheck2Square size={17} style={{ marginRight: "-2.5px", color: "black" }} />
          ) : (
            <BsSquare size={15} />
          )}
        </div>
        <p className="mx-4 m-0 p-0">{lesson.name} <br /> <span className={style.infoLessonMobile}>{lesson.info}</span></p>
      
      </div>
    </div>
  );
}
