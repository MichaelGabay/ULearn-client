import React, { useRef } from "react";
import style from "./showCourse.module.css";
import { blueGrey, grey, lightGreen, lime, red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Delete } from "@mui/icons-material";
import { ReactFileInputCustom } from "react-file-input-custom";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { apiDelete, apiPut } from "../../../shared/services/services";
import {
  DELETE_LESSON_ROUTE,
  UPDATE_LESSON_ROUTE,
} from "../../../shared/constant/url";
import useSimpleForm from "../../../shared/hooks/useForm";
import { fixSrcString } from "../../../shared/helpers/fixSrcLink";
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

const EditLesson = ({ lesson, render, setShowEdit }) => {
  const [query] = useSearchParams();
  const [form, setForm, errors, setErrors, resetForm] = useSimpleForm({
    name: "",
    info: "",
    link: "",
  });

  let errosObj = {};
  //render component for update default values on input
  useEffect(() => {
    setForm(lesson);
  }, [lesson]);

  //delete lesson
  const deleteLesson = async () => {
    let resp = await apiDelete(
      DELETE_LESSON_ROUTE +
      `?courseShortId=${query.get("shortId")}&lessonId=${lesson._id}`
    );
    render(query.get("shortId"));
    setShowEdit(false);
  };
  //  doing validation
  useEffect(() => {
    valid();
  }, [form]);

  const valid = () => {
    if (!form.name || form.name.length > 40) errosObj.name = "שם אינו תקין";
    if (form.info?.length > 180) errosObj.info = "תיאור אינו תקין";
    if (!form.link || form.link.length > 2000) errosObj.link = "לינק אינו תקין";
    if (lesson === form) errosObj.equal = "אין שינויים";
    setErrors(errosObj);
  };
  // submiting
  const onSubmit = (e) => {
    e.preventDefault();
    if (errors.equal) {
      alert("אין שינויים");
      setShowEdit(false);
    }
    if (errors.name || errors.info || errors.link || errors.equal) return;
    let bodyData = { ...form };
    delete bodyData._id;
    bodyData.link = fixSrcString(bodyData.link)
    updatCourse(bodyData);
  };
  //updating
  const updatCourse = async (data) => {
    let resp = await apiPut(
      UPDATE_LESSON_ROUTE +
      `?courseShortId=${query.get("shortId")}&lessonId=${lesson._id}`,
      data
    );
    render(query.get("shortId"));
    setShowEdit(false);
  };

  return (
    <div
      dir="rtl"
      style={{ borderRight: "px solid gray" }}
      className="w-100 p-5"
    >
      <h2 className="pb-3">עריכת שיעור</h2>
      <form onSubmit={onSubmit}>
        <div className="col-lg-3 col-md-4  mt-3">
          <label>שם השיעור</label>
          <input
            value={form.name}
            onChange={(e) => {
              setForm({ name: e.target.value });
            }}
            className={`${style.formCtrl} ${style.myShadow}`}
            type="text"
          />
          {errors.name && (
            <small className="text-danger d-block">{errors.name}</small>
          )}
        </div>
        <div className="col-lg-5 col-md-4  mt-3">
          <label>תיאור </label>
          <textarea
            value={form.info}
            onChange={(e) => setForm({ info: e.target.value })}
            rows={4}
            maxLength={181}
            className={`${style.textArea} ${style.myShadow}`}
            type="text"
          ></textarea>
          {errors.info && (
            <small className="text-danger d-block">{errors.info}</small>
          )}
        </div>
        <div className="col-lg-7 mt-3">
          <label>לינק לסרטון השיעור (קוד הטמעה)</label>
          <input
            value={form.link}
            onChange={(e) => setForm({ link: e.target.value })}
            className={`${style.formCtrl} ${style.myShadow}`}
            type="text"
          />
          {errors.link && (
            <small className="text-danger d-block">{errors.link}</small>
          )}
        </div>
        <div className="col-lg-3 col-md-4 mt-3">
          <label>קבצים של השיעור</label>
          <ReactFileInputCustom
            classes={"p-2 w-100 w-lg-auto " + style.fileUpload}
            text="הוסף קבצים"
            textColor="white"
            backgroundColor="#ffffff"
          />
        </div>
        <div className="d-flex justify-content-center mt-5">
          <div className="col-8 d-flex justify-content-center">
            <ThemeProvider theme={custom}>
              <div className="col-3 ms-2">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ width: "100%", fontSize: "1.2em", padding: "3px" }}
                >
                  עדכון שיעור
                </Button>
              </div>

              <div className="col-3">
                <Button
                  type="button"
                  onClick={() => deleteLesson()}
                  variant="contained"
                  color="error"
                  sx={{ width: "100%", fontSize: "1.2em", padding: "3px" }}
                >
                  מחק שיעור <Delete />
                </Button>
              </div>
            </ThemeProvider>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLesson;
