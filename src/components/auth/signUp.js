import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { apiPost } from "../../shared/services/services";
import { SIGN_UP_ROUTE } from "../../shared/constant/url";
import style from './auth.module.css';
import { Button } from "@mui/material";
import useSimpleForm from "../../shared/hooks/useForm";

const SignUp = () => {
  let errorsObj = {}
  const [form, setForm, errors, setErrors, resetForm] = useSimpleForm({ email: "", password: "", phone: "", firstName: "", lastName: "" });
  const regEmail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
  const [eye, setEye] = useState("password");
  const nav = useNavigate();
  // submitted form
  const onSub = (e) => {
    e.preventDefault();
    valid()
    if (errorsObj.email || errorsObj.password || errorsObj.firstName || errorsObj.lastName || errorsObj.phone) {
      return
    }
    const obj = fixFormat(form);
    signUp(obj);
  };
  // validation form
  const valid = () => {
    if (!form.email) {
      errorsObj.email = "חובה למלא אימייל";
    }
    else if (!regEmail.test(form.email)) {
      errorsObj.email = "מייל לא תקין";
    }
    if (!form.password) {
      errorsObj.password = "חובה למלא סיסמא";
    }
    if (form.password.length > 25 || form.password.length < 5) {
      errorsObj.password = "סיסמא אינה תקינה";
    }
    if (!form.firstName) {
      errorsObj.firstName = "חובה למלא שם פרטי";
    }
    if (!form.lastName) {
      errorsObj.lastName = "חובה למלא שם משפחה";
    }
    setErrors(errorsObj)
  }
  // fixing to schema format
  const fixFormat = (_dataBody) => {
    let obj = {};
    obj.fullName = {
      firstName: _dataBody.firstName,
      lastName: _dataBody.lastName,
    };
    obj.phone = _dataBody.phone;
    obj.email = _dataBody.email;
    obj.password = _dataBody.password;
    return obj;
  };
  // doing signUp request
  const signUp = async (_dataBody) => {
    try {
      await apiPost(SIGN_UP_ROUTE, _dataBody);
      nav("/login")
    } catch (err) {
      if (err.response.data.code == 11000) {
        setErrors({ ...errorsObj, resp: "אימייל זה קיים במערכת" })
      }
    }
  };






  return (
    <div
      style={{ height: "80vh" }}
      className="justify-content-center pt-5 d-flex container"
    >
      <div dir="rtl" className="col-lg-5 col-md-8 col-12">
        <h1 className="display-6 text-center pb-5">הרשמה</h1>
        <form className="px-4 p-md-0" onSubmit={onSub}>
          <div className="d-flex col-12 justify-content-between">
            <div className="col-6">
              <label>שם פרטי</label>
              <div>
                <div className="col-12"></div>
                <input
                  value={form.firstName}
                  onChange={e => setForm({ firstName: e.target.value })}
                  type="text"
                  className={`col-12 ${style.formCtrl} ${style.myShadow}`}
                />
              </div>
              {errors.firstName && <small className="text-danger d-block">{errors.firstName}</small>}
            </div>
            <div className="col-5">
              <label>שם משפחה</label>
              <div>
                <div className="col-12"></div>
                <input
                  value={form.lastName}

                  onChange={e => setForm({ lastName: e.target.value })}

                  type="text"
                  className={`col-12 ${style.formCtrl} ${style.myShadow}`}
                />
              </div>
              {errors.lastName && <small className="text-danger d-block">{errors.lastName}</small>}
            </div>
          </div>

          <div className="pt-3">
            <label>טלפון</label>
            <div>
              <div className="col-12"></div>
              <input
                value={form.phone}
                onChange={e => setForm({ phone: e.target.value })}
                type="text"
                className={`col-12 ${style.formCtrl} ${style.myShadow}`}
              />
            </div>

          </div>

          <div className="pt-3">
            <label>כתובת מייל</label>
            <div>
              <div className="col-12"></div>
              <input
                value={form.email}
                onChange={e => setForm({ email: e.target.value })}
                type="text"
                className={`col-12 ${style.formCtrl} ${style.myShadow}`}
              />
            </div>
            {errors.email && (
              <small className="text-danger d-block">{errors.email}</small>
            )}
          </div>

          <div className="pt-3">
            <div>
              <label>סיסמא:</label>
              <div className={`d-flex ${style.formCtrl} ${style.myShadow} align-items-center`}>
                <input
                  value={form.password}
                  onChange={e => setForm({ password: e.target.value })}
                  type={eye}
                  className={` col-11 ${style.formPassword}`}
                />
                {eye === "password" ? (
                  <FaEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() => setEye("text")}
                    className="me-auto ms-2 "
                    fontSize={"20px"}
                  />
                ) : (
                  <FaEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setEye("password")}
                    className="me-auto ms-2"
                    fontSize={"20px"}
                  />
                )}
              </div>
              {errors.password && (
                <small className="text-danger d-block">{errors.password}</small>
              )}
            </div>
            {errors.resp && (
              <small className="text-danger d-block">{errors.resp}</small>
            )}

          </div>

          <div className='justify-content-center d-flex pt-5'>

            <Button type='submit' className={`mx-4 ${style.btn}`} variant="contained" color="success" sx={{ width: '100%', fontSize: '1.1em' }}>הרשם</Button>
            <Button type='button' className={`mx-4 ${style.btn}`} onClick={() => nav('/login')} variant="contained" color="success" sx={{ width: '100%', fontSize: '1.1em' }}>חזור</Button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
