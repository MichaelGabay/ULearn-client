import {  Button } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { time_ago } from "../../shared/helpers/calculationTimeForDisplay";
import style from "./displayCourse.module.css";
import QuestionItem from "./questionItem";

const Questions = ({
    onAddQClick,
    showCommentsQ,
    setQuestionWhoClickd, course, setCourse, setLessonToPlay, lessonIndex, user
}) => {
    const [questionFixd, seTQuestionFixd] = useState();
    // fixing time to comments time format
    useEffect(() => {
        if (course?.lessons?.length > 0) {
            const qArr = JSON.parse(JSON.stringify(course?.lessons[lessonIndex].FAQ));
            qArr.map((item) => {
                item.Q.date_created = time_ago(item.Q.date_created);
            });
            seTQuestionFixd(qArr);
        }
    }, [lessonIndex, course]);

    return (
        <div dir="rtl" className="d-flex justify-content-center pt-3 pb-5">
            <div className={style.questionsWidth}>
                <div className={"d-flex justify-content-center col-10 mb-3"}>
                    <div
                        className={
                            " d-flex align-items-center " +
                            style.formCtrl +
                            " " +
                            style.myShadow
                        }
                    >
                        <FaSearch cursor={"pointer"} className="col-auto" />
                        <input
                            type="text"
                            placeholder="חפש כל שאלה על שיעור זה..."
                            className={"col-10 " + style.input}
                        />
                    </div>
                </div>

                <div className="float-start">
                    <Button onClick={onAddQClick} color="primary" size="large">
                        (הוספת שאלה חדשה)
                    </Button>
                </div>
                <h4 style={{ fontSize: "1.5em", fontWeight: "200" }}>שאלות:</h4>

                {
                    questionFixd?.length > 0 && questionFixd.map((item) => (
                        <QuestionItem
                            userId={user._id}
                            key={item._id}
                            item={item}
                            showCommentsQ={showCommentsQ}
                            setQuestionWhoClickd={setQuestionWhoClickd}
                            course={course}
                            setCourse={setCourse}
                            lessonIndex={lessonIndex}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Questions;
