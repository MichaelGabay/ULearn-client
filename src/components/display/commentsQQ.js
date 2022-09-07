import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ADD_ANSSWER_ROUTE, DELETE_COMMENT_FROM_QUESTION } from "../../shared/constant/url";
import { time_ago } from "../../shared/helpers/calculationTimeForDisplay";
import useSimpleForm from "../../shared/hooks/useForm";
import { apiDelete, apiPost } from "../../shared/services/services";
import style from "./displayCourse.module.css";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const CommentsQQ = ({
    onBackToQClick,
    questionWhoClickd,
    setQuestionWhoClickd,
    course,
    lessonIndex,
    setCourse
}) => {
    const [form, setForm, errors, setErrors, resetForm] = useSimpleForm({
        data: "",
    });
    const { user } = useSelector((store) => store.userReducer);
    const [query] = useSearchParams()
    const [qObj, setQbj] = useState();
    // update view whith time in comments format
    useEffect(() => {
        const questionObj = JSON.parse(JSON.stringify(questionWhoClickd));
        questionObj.answerAr.map((item) => {
            item.date_created = time_ago(item.date_created);
        });
        if (Number.isInteger(questionObj.Q.date_created)) {
            questionObj.Q.date_created = time_ago(questionObj.Q.date_created)
        }
        setQbj(questionObj);
    }, [questionWhoClickd]);
    // on submiting
    const submit = () => {
        let validObj = {};
        if (!form.data) {
            validObj.data = "תשובה לא יכולה להיות ריקה";
        } else if (form.data.length < 5) {
            validObj.data = "תשובה חייבת להיות מעל 5 תווים";
        }
        setErrors(validObj);
        if (validObj.data) return;
        addAnsswer();
    };
    // doing add request
    const addAnsswer = async () => {
        let url =
            ADD_ANSSWER_ROUTE +
            `?courseShortId=${query.get("shortId")}&lessonId=${course.lessons[lessonIndex]._id}&QId=${questionWhoClickd._id}`;
        let obj = { data: form.data, date_created: new Date().getTime() };
        let { data } = await apiPost(url, obj);
        if (data.msg == "answer added") {
            let courseObject = { ...course };
            courseObject.lessons[lessonIndex].FAQ.forEach(item => {
                if (item._id == questionWhoClickd._id) {
                    item.answerAr.unshift(data.ansswer)
                    setQuestionWhoClickd(item)
                }
            })
            window.scrollTo(0, 280);
            setForm({ data: "" });
        }
    };
    // doing delete request
    const deleteAnswer = async (item) => {
        let url = DELETE_COMMENT_FROM_QUESTION + `?courseShortId=${query.get("shortId")}&lessonId=${course.lessons[lessonIndex]._id}&QId=${questionWhoClickd._id}&AId=${item._id}`
        let { data } = await apiDelete(url);
        if (data.msg == "answer deleted") {
            let courseObj = { ...course }
            courseObj.lessons[lessonIndex].FAQ.forEach(element => {
                if (element._id == questionWhoClickd._id) {
                    element.answerAr = element.answerAr.filter(e => {
                        return e._id != item._id;
                    })
                    setQuestionWhoClickd({ ...element, })
                }
            })
            setCourse(courseObj)
        }
    }
    return (
        <div dir="rtl" className="d-flex justify-content-center my-4">
            <div className={style.commentsWidth}>
                <Button
                    className={style.btnAddQ}
                    variant="outlined"
                    onClick={onBackToQClick}
                >
                    חזור לכל השאלות
                </Button>

                <div
                    style={{ position: "relative" }}
                    className={style.question + " d-flex mt-3 col-9 overflow-auto"}
                >
                    {qObj?._id &&
                        <div className="col-8">
                            <div dir="rtl" className="mb-3 ">
                                <div className="d-flex justify-content-between flex-column">
                                    <div className="d-flex align-items-center">
                                        <Avatar sx={{ width: "auto", padding: "5px 10px" }}>
                                            {qObj.Q.name}
                                        </Avatar>
                                        <h6 className="mx-3 my-0 p-0">{questionWhoClickd.Q.title}</h6>
                                    </div>
                                    <pre
                                        style={{ fontFamily: "sans-serif" }}
                                        className={style.infoQ}
                                    >
                                        {qObj.Q.data}
                                    </pre>
                                    <p
                                        style={{
                                            fontSize: "0.8em",
                                            position: "absolute",
                                            bottom: "0",
                                            left: "20px",
                                        }}
                                        className="text-muted ms-auto"
                                    >
                                        {qObj.Q.date_created}
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="col-10 mt-4">
                    <p style={{ fontWeight: "bold" }}>
                        {qObj?.answerAr.length} תגובות
                    </p>
                    {qObj?.answerAr?.map((item) => (
                        <div
                            style={{ position: "relative" }}
                            className={style.comment}
                            key={item._id}
                        >
                            <div className="d-flex flex-column align-items-center overflow-hidden">
                                <Avatar
                                    className="align-self-start  my-3"
                                    sx={{ width: "auto", padding: "5px 10px" }}
                                >
                                    {item.name}
                                </Avatar>
                                <p className={style.infoQ}>{item.data}</p>
                                {user?._id == item.userId && (
                                    <FaTimes
                                        title="מחק תגובה זאת"
                                        className={style.trashIcon}
                                        style={{
                                            position: "absolute",
                                            left: "10px",
                                            bottom: "10px",
                                        }}
                                        onClick={() => deleteAnswer(item)}
                                    />
                                )}
                            </div>
                            <p
                                style={{ fontSize: "0.8em" }}
                                className="text-muted ms-auto pt-3"
                            >
                                {item.date_created}
                            </p>
                            <hr />
                        </div>
                    ))}
                </div>

                <div className="col-10 py-4">
                    <label>הוסף תגובה:</label>

                    <textarea
                        value={form.data}
                        onChange={(e) => setForm({ data: e.target.value })}
                        rows={5}
                        placeholder="כתוב כאן את תגובתך..."
                        className={style.textArea + " " + style.formCtrl}
                    ></textarea>
                    {errors.data && (
                        <small className="text-danger d-block">{errors.data}</small>
                    )}

                    <Button
                        onClick={submit}
                        className={style.addComment + " mt-2 d-block"}
                        variant="contained"
                    >
                        הוסף תגובה
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CommentsQQ;
