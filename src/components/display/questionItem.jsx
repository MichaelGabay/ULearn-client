import { Avatar } from "@mui/material";
import React from "react";
import { FaComments } from "react-icons/fa";
import style from "./displayCourse.module.css";
import { FaTimes } from "react-icons/fa";
import { apiDelete } from "../../shared/services/services";
import { DELETE_QUESTION_FROM_LESSON } from "../../shared/constant/url";
import { useSearchParams } from "react-router-dom";
const QuestionItem = ({
  item,
  showCommentsQ,
  setQuestionWhoClickd,
  userId, course,setCourse,lessonIndex
}) => {
  const [qurey] = useSearchParams()
  const deleteQ = async () => {
    let url = DELETE_QUESTION_FROM_LESSON + `?courseShortId=${qurey.get('shortId')}&lessonId=${course.lessons[lessonIndex]._id}&QId=${item._id}`
    const { data } = await apiDelete(url);
    let courseObj= {...course}
    courseObj.lessons[lessonIndex].FAQ=courseObj.lessons[lessonIndex].FAQ.filter(element=>element._id!=item._id)
    // course.lessons.forEach((e) => {
    //   if (e._id == lessonId) {
    //     e.FAQ= e.FAQ.filter(e=>e._id!=item._id)
    //   }
    // });
    setCourse(courseObj)
  };
  return (
    <div
      style={{ position: "relative" }}
      className={style.question + " d-flex mt-3"}
    >
      <div className="col-8 ">
        <div dir="rtl" className="mb-3 ">
          <div className="d-flex justify-content-between flex-column ">
            <div className="d-flex align-items-center">
              <Avatar  sx={{ width: "auto", padding:"2%" }}>
                {item?.Q.name}
              </Avatar>
              <p
                onClick={() => {
                  showCommentsQ();
                  setQuestionWhoClickd(item);
                }}
                className="mx-3 my-0 p-0"
                style={{ cursor: "pointer" }}
              >
                {item?.Q.title}
              </p>
            </div>
            <p
              onClick={() => {
                showCommentsQ();
                setQuestionWhoClickd(item);
              }}
              style={{ fontFamily: "sans-serif", cursor: "pointer" }}
              className={style.infoQ + " py-2"}
            >
              {item?.Q.data}
            </p>
            <p
              style={{
                fontSize: "0.8em",
                position: "absolute",
                bottom: "0",
                left: "20px",
              }}
              className="text-muted ms-auto"
            >
              {item.Q.date_created}
            </p>
            {userId == item.Q.userId && (
              <FaTimes
                onClick={deleteQ}
                title="מחק שאלה זאת"
                className={style.trashIcon}
                style={{ position: "absolute", right: "10px", bottom: "10px" }}
              />
            )}
          </div>
        </div>
      </div>
      <div dir="ltr" className="col-4">
        <div className="d-flex">
          <p className="text-muted me-1 ">{item.answerAr.length}</p>{" "}
          <FaComments
            cursor={"pointer"}
            className={style.comments}
            size={25}
            onClick={() => {
              showCommentsQ();
              setQuestionWhoClickd(item);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
