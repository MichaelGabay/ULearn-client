import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactFileInputCustom } from "react-file-input-custom";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import AuthUser from "../../../../shared/components/auth/authUser";
import { apiGet, apiPut } from "../../../../shared/services/services";
import style from "./showCourse.module.css";
import {
  GET_CATEGORIES_ROUTE,
  UPDATE_COURSE_ROUTE,
} from "../../../../shared/constant/url";
import axios from "axios";
import useSimpleForm from "../../../../shared/hooks/useForm";

const EditCourse = ({ courseInfo }) => {
  let errosObj = {};
  const nav = useNavigate();
  const [query] = useSearchParams();
  const [courseImageFile, setCourseImageFile] = useState(false);
  const [masseg, setMasseg] = useState("");
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm, errors, setErrors, resetForm] = useSimpleForm({
    name: "",
    img_url: "",
    info: "",
    price: "",
    categoryShortId: "",
  });

  useEffect(() => {
    setForm(courseInfo);
    getCategories();
  }, [courseInfo]);

  // get all categories
  const getCategories = async () => {
    let { data } = await apiGet(GET_CATEGORIES_ROUTE);
    fixForSelect(data);
  };
  // create array for select component
  const fixForSelect = (categories) => {
    let options = [];
    categories.forEach((item) => {
      options.push({ value: item.short_id, label: item.name });
    });
    setCategoriesOptions(options);
  };
  // submiting
  const onSub = (e) => {
    e.preventDefault();
    if (errors.name || errors.price) {
      return;
    }
    setLoading(true);
    doUpdateCourse();
  };
  // update request
  const doUpdateCourse = async () => {
    let obj = { ...form };
    delete obj.categoryInSelect;
    try {
      if (courseImageFile) {
        obj.img_url = await uploadImage();
        setForm({ img_url: obj.img_url });
      }
      const { data } = await apiPut(
        UPDATE_COURSE_ROUTE + "?shortId=" + query.get("shortId"),
        obj
      );
      setLoading(false);
      setMasseg("השינויים נשמרו");
      setTimeout(() => {
        setMasseg("");
      }, 3000);
    } catch (err) {
      console.log(err.response);
    }
  };
  // uploadin imag
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", courseImageFile);
    formData.append("upload_preset", "miki101");
    let resp = await axios.post(
      "https://api.cloudinary.com/v1_1/michael-gabay/image/upload",
      formData
    );
    return resp.data.url;
  };
  // doing validation 
  useEffect(() => {
    if (courseInfo.name) {
      valid();
    }
  }, [form]);
  const valid = () => {
    if (!form.name || form.name.length > 40) errosObj.name = "שם אינו תקין";
    if (!form.price && form.price !== 0) errosObj.price = "מחיר חובה";
    if (form.info.length > 1000) errosObj.info = "תיאור אינו תקין";
    setErrors(errosObj);
  };

  return (
    <>
      <AuthUser />
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
      ) : (
        <div style={{ direction: "rtl" }} className="container d-flex me-5">
          {courseInfo?.info && form && (
            <form onSubmit={onSub} className=" col-6 mt-5">
              <h1 className="text-lg-end text-center  pb-4 ">עדכן קורס</h1>

              <div className="d-lg-flex justify-content-between">
                <div className="ms-lg-4 col-lg-6">
                  <label>שם קורס</label>
                  <div>
                    <input
                      placeholder="הקלד שם קורס..."
                      value={form.name}
                      onChange={(e) => setForm({ name: e.target.value })}
                      type="text"
                      className={`col-12 ${style.formCtrl} ${style.myShadow}`}
                    />
                  </div>
                  {errors.name && (
                    <small className="text-danger text-center d-block">
                      שם הוא חובה
                    </small>
                  )}
                </div>
                <div className="col-lg-5">
                  <label>קטגוריה</label>
                  <div>
                    <div className="col-12 ">
                      <Select
                        onChange={(e) =>
                          setForm({
                            categoryInSelect: e,
                            categoryShortId: e.value,
                          })
                        }
                        placeholder="בחר קטגוריה..."
                        className={`col-12 text-center ${style.myShadow} me-auto`}
                        options={categoriesOptions}
                        value={form.categoryInSelect}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <label className="mb-1">תיאור הקורס</label>
                <div>
                  <textarea
                    maxLength={181}
                    value={form.info}
                    onChange={(e) => setForm({ info: e.target.value })}
                    placeholder="ספר בקצרה על הקורס...."
                    rows={5}
                    className={`col-12 ${style.textArea} ${style.myShadow}`}
                  ></textarea>
                </div>
                {errors.info && (
                  <small className="text-danger d-block">{errors.info}</small>
                )}
              </div>
              <div className="col-lg-12 mt-3  row align-items-center">
                <div className=" col-2 mb-3 mb-lg-0">
                  <label className="mb-1">מחיר</label>
                  <div className="col-12">
                    <input
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setForm({ price: e.target.value })}
                      style={{ height: "40px" }}
                      type={"number"}
                      placeholder="בחר מחיר...."
                      min={0}
                      className={`col-12 text-center ${style.textArea} ${style.myShadow}`}
                    />
                  </div>
                  <div className="d-block d-lg-none">
                    {errors.price && (
                      <small className="text-danger d-block">
                        מחיר הקורס הוא חובה, אם הקורס חינמי הכנס- 0
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-5 mb-3 mb-lg-0">
                  <label></label>
                  <ReactFileInputCustom
                    handleChange={(e) => {
                      setCourseImageFile(e.target.files[0]);
                    }}
                    classes={"p-2 w-100 w-lg-auto " + style.fileUpload}
                    text="עדכן תמונה לקורס"
                    textColor="white"
                    backgroundColor="hsl(118, 31%, 79%)"
                  />
                </div>

                <div className="col-3 ">
                  <img className="w-100" src={form.img_url} alt={form.name} />
                </div>
              </div>
              <div className="d-none d-lg-block">
                {errors.price && (
                  <small className="text-danger d-block">
                    מחיר הקורס הוא חובה, אם הקורס חינמי הכנס- 0
                  </small>
                )}
              </div>

              <div className=" col-12 d-flex pt-5 justify-content-center">
                <Button
                  type="submit"
                  className={`${style.btn} ms-4`}
                  variant="contained"
                  color="success"
                  sx={{ width: "100%", fontSize: "1.1em" }}
                >
                  עדכן קורס
                </Button>
                <Button
                  type="button"
                  onClick={() => nav(-1)}
                  className={`${style.btn} px-4 mx-4`}
                  variant="contained"
                  color="success"
                  sx={{ width: "100%", fontSize: "1.1em" }}
                >
                  חזור
                </Button>
              </div>
              <small
                style={{ fontSize: "16px" }}
                className="text-primary d-block mt-1"
              >
                {masseg}
              </small>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default EditCourse;
