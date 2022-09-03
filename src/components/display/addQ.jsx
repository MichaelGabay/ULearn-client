import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ADD_QUESTION_ROUTE } from "../../shared/constant/url";
import useSimpleForm from "../../shared/hooks/useForm";
import { apiPost } from "../../shared/services/services";
import style from "./displayCourse.module.css";

export default function AddQ({  onBackToQClick,course,lessonIndex }) {
  let errorObj = {};
  const [query]=useSearchParams()
  const [form, setForm, errors, setErrors, resetForm] = useSimpleForm({
    title: "",
    data: "",
  });
// on submiting
  const onSubmit = (e) => {
    e.preventDefault();
    validate();
    if (errorObj.title) {
      return;
    }
    AddQuestion();
  };
// doing validation
  const validate = () => {
    if (form.title.length < 5) {
      errorObj.title = "שאלה חייבת לכלול לפחות 5 תווים";
    }
    if (!form.title) {
      errorObj.title = "כותרת השאלה היא חובה";
    }
    setErrors(errorObj);
  };
  // doing add request
  const AddQuestion = async () => {
    let obj = {...form}
    obj.date_created = (new Date).getTime()

    let { data } = await apiPost(
      ADD_QUESTION_ROUTE + `?courseShortId=${query.get("shortId")}&lessonId=${course.lessons[lessonIndex]._id}`,
      obj
    );
    if (data.msg == "Q added") {
      let courseObj= {...course};
      courseObj.lessons[lessonIndex].FAQ.unshift(data.question);
      onBackToQClick();
    }
  };
  return (
    <div>
      <div dir="rtl" className="d-flex justify-content-center my-4">
        <div className="col-8 ">
          <Button
            onClick={onBackToQClick}
            className={style.btnAddQ}
            variant="outlined"
          >
            חזור לכל השאלות
          </Button>

          <div className={style.tipAddQ + " my-3"}>
            <p className="p-0 m-0 pb-2" style={{ fontWeight: "bold" }}>
              5 טיפים להוספת שאלה
            </p>
            <ul>
              <li>הימנעו ממילוי התוכן במילים חסרות משמעות</li>
              <li>ערכו את התוכן בעצמכם או העבירו לעריכה חיצונית</li>
              <li>קצרו במילים</li>
              <li>אל תקברו את הנושא העיקרי שלכם במלל מיותר</li>
              <li>הימנעו מחזרתיות (גם אם בניסוח שונה)</li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="pt-2 pb-5">
            <div className="col-8">
              <label>כותרת השאלה:</label>
              <div className={style.formCtrl + " " + style.myShadow}>
                <input
                  onChange={(e) => setForm({ title: e.target.value })}
                  value={form.title}
                  type="text"
                  placeholder="כתוב שאלה..."
                  className={"col-10 " + style.input}
                />
              </div>
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
              )}
            </div>
            <div className="col-10 mt-4">
              <label>פירוט:</label>

              <textarea
                onChange={(e) => setForm({ data: e.target.value })}
                value={form.data}
                rows={5}
                placeholder="פרט על השאלה..."
                className={style.textArea + " " + style.formCtrl}
              ></textarea>
            </div>
            <Button
              type="submit"
              className={style.btnPublish}
              variant="contained"
            >
              פרסם
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
