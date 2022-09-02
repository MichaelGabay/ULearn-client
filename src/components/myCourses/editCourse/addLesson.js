import React, { useState } from "react";
import style from "./showCourse.module.css";
import { blueGrey, grey, lightGreen, lime, red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { ReactFileInputCustom } from "react-file-input-custom";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ADD_LESSON_ROUTE } from "../../../shared/constant/url";
import { apiPost } from "../../../shared/services/services";
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

const AddLesson = ({ render, setShowAdd }) => {
  const [query] = useSearchParams();
  let errorsObj = {}
  const [form, setForm, errors, setErrors, resetForm] = useSimpleForm({ name: "", info: "", link: "" })
// submiting
  const onSub = (e) => {
    e.preventDefault();
    valid()
    if (errorsObj.name || errorsObj.info || errorsObj.link) {
      return
    }
    addLesson(query.get("shortId"), form);
    render(query.get("shortId"))
  };
  // doing validation
  const valid = () => {
    if (!form.name || form.name.length > 40)
      errorsObj.name = "שם אינו תקין";
    if (form.info.length > 180)
      errorsObj.info = "תיאור אינו תקין";
    if (!form.link || form.link.length > 2000)
      errorsObj.link = "לינק אינו תקין";
    setErrors(errorsObj)
  }
// adding request
  const addLesson = async (shortId, data) => {
    data.link=fixSrcString(data.link);
    let resp = await apiPost(
      ADD_LESSON_ROUTE + `?courseShortId=${shortId}`,
      data
    );
    setShowAdd(false);
    render(shortId)
  };

  return (
    <div
      dir="rtl"
      style={{ borderRight: "px solid gray" }}
      className="w-100 p-5"
    >
      <h2 className="pb-3">הוספת שיעור</h2>
      <form onSubmit={onSub}>
        <div className="col-lg-3 col-md-4  mt-3">
          <label>שם השיעור</label>
          <input
            onChange={e => setForm({ name: e.target.value })}
            value={form.name}
            className={`${style.formCtrl} ${style.myShadow}`}
            type="text"
          />
          {errors.name && (
            <small className="text-danger d-block">שם שיעור חובה!</small>
          )}
        </div>
        <div className="col-lg-5 col-md-4  mt-3">
          <label>תיאור </label>
          <textarea
            onChange={e => setForm({ info: e.target.value })}
            value={form.info}
            maxLength={180}
            rows={4}
            className={`${style.textArea} ${style.myShadow}`}
            type="text"
          ></textarea>
        </div>
        <div className="col-lg-7 mt-3">
          <label>לינק לסרטון השיעור</label>
          <input
            onChange={e => setForm({ link: e.target.value })}
            value={form.link}
            className={`${style.formCtrl} ${style.myShadow}`}
            type="text"
          />
          {errors.link && (
            <small className="text-danger d-block">לינק חובה!</small>
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

        <div className="d-flex justify-content-center mt-3">
          <div className="col-7 d-flex justify-content-center">
            <ThemeProvider theme={custom}>
              <div className="col-4">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ width: "100%", fontSize: "1.2em" }}
                >
                  הוסף שיעור
                </Button>
              </div>
            </ThemeProvider>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLesson;
