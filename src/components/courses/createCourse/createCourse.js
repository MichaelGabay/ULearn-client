import React, { useEffect, useState } from "react";
import "./createCourse.module.css";
import createCoursePic from "../../../assets/images/createCourse/createCourse.webp";
import { useForm } from "react-hook-form";
import style from "./createCourse.module.css";
import {
  ADD_COURSE_ROUTE,
  GET_CATEGORIES_ROUTE,
} from "../../../shared/constant/url";
import { apiGet, apiPost } from "../../../shared/services/services";
import Select from "react-select";
import { ReactFileInputCustom } from "react-file-input-custom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import AuthUser from "../../../shared/components/auth/authUser";

let categoryShortId;
const CreateCourse = () => {
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [courseImagFile, setCourseImagFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // get all the categories
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    let { data } = await apiGet(GET_CATEGORIES_ROUTE);
    fixForSelect(data);
  };
  // create array for select options
  const fixForSelect = (categories) => {
    let options = [];
    categories.forEach((item) => {
      options.push({ value: item.short_id, label: item.name });
    });
    setCategoriesOptions(options);
  };
  //on submit
  const onSub = async (_dataBody) => {
    _dataBody.categoryShortId = categoryShortId;
    if (!_dataBody.categoryShortId) {
      alert("you must choose category");
      return;
    }
    // colling to uploading image
    if (courseImagFile) {
      setLoading(true);
      let imgUrl = await uploadImage();
      _dataBody.img_url = imgUrl;
    }
    createCourse(_dataBody);
  };

  // uploading image to cloudinery
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", courseImagFile);
    formData.append("upload_preset", "miki101");
    let resp = await axios.post(
      "https://api.cloudinary.com/v1_1/michael-gabay/image/upload",
      formData
    );
    return resp.data.url;
  };

  //doing create request
  const createCourse = async (course) => {
    try {
      await apiPost(ADD_COURSE_ROUTE, course);
      nav("/myCourses");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AuthUser />
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
      <div
        className={`d-lg-flex justify-content-around align-items-center p-lg-5 `}
        style={{ direction: "rtl" }}
      >
        <div className="d-flex   justify-content-center pt-4 mt-4 py-lg-0  col-lg-5 col-md-12 ">
          {/* class form  */}
          <form
            onSubmit={handleSubmit(onSub)}
            className=" col-lg-12 col-md-8 col-10"
          >
            <h1 className="text-lg-end text-center  pb-4 ">צור קורס</h1>

            <div className="d-lg-flex justify-content-between">
              <div className="ms-lg-4 col-lg-6">
                <label>שם קורס</label>
                <div>
                  <input
                    placeholder="הקלד שם קורס..."
                    {...register("name", { required: true })}
                    type="text"
                    className={`col-12 ${style.formCtrl} ${style.myShadow}`}
                  />
                </div>
                {errors.name && (
                  <small className="text-danger d-block">שם הוא חובה</small>
                )}
              </div>
              <div className="col-lg-5">
                <label>קטגוריה</label>
                <div>
                  <div className="col-12 ">
                    <Select
                      placeholder="בחר קטגוריה..."
                      options={categoriesOptions}
                      className={`col-12 text-center ${style.myShadow} me-auto`}
                      onChange={(e) => (categoryShortId = e.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-3">
              <label className="mb-1">תיאור הקורס</label>
              <div>
                <textarea
                  placeholder="ספר בקצרה על הקורס...."
                  rows={5}
                  {...register("info", { required: true, minLength: 2 })}
                  className={`col-12 ${style.textArea} ${style.myShadow}`}
                ></textarea>
              </div>
              {errors.info && (
                <small className="text-danger d-block">
                  תיאור הקורס הוא חובה
                </small>
              )}
            </div>
            <div className="col-lg-9   row align-items-center">
              <div className=" col-lg-5  col-12 mb-3 mb-lg-0">
                <label className="mb-1">מחיר</label>
                <div className="col-12">
                  <input
                    step="0.01"
                    style={{ height: "40px" }}
                    type={"number"}
                    placeholder="בחר מחיר...."
                    defaultValue={0}
                    min={0}
                    {...register("price", { required: true, minLength: 0 })}
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
              <div className="col-lg-6  col-12 mb-3 mb-lg-0">
                <label></label>
                <ReactFileInputCustom
                  handleChange={(e) => setCourseImagFile(e.target.files[0])}
                  classes={"p-2 w-100 w-lg-auto " + style.fileUpload}
                  text="הוסף תמונה לקורס"
                  textColor="white"
                  backgroundColor="hsl(118, 31%, 79%)"
                />
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
                צור קורס
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
          </form>
        </div>
        <div className="overflow-hidden col-5 d-none d-lg-block mt-5   ">
          <div className={`${style.imgCourse} mb-5`}>
            <img src={createCoursePic} width="100%" height={"100%"} alt="" />
          </div>
        </div>
      </div>

    </>
  );
};

export default CreateCourse;
