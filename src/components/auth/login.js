import React from 'react'
import { useNavigate } from 'react-router-dom';
import style from './auth.module.css';
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useState } from 'react';
import { apiPost } from '../../shared/services/services';
import { LOGIN_ROUTE, LOGIN_WITH_GOOGLE_ROUTE } from '../../shared/constant/url';
import { useEffect } from 'react';
import { TOKEN_KEY } from '../../shared/constant/string';
import facebookPic from '../../assets/images/authPic/facebook.png'
import { Button } from '@mui/material';
import useSimpleForm from '../../shared/hooks/useForm';
import { useDispatch } from "react-redux";
import { getUser } from '../../shared/redux/features/userSlice';
import jwt_decode from "jwt-decode"
const regEmail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
const Login = () => {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const [form, setForm, errors, setErrors, resetForm] = useSimpleForm({ email: "", password: "" })
    const [eye, setEye] = useState('password')
    let errorsObj = {}

    // submitted form 
    const onSub = (e) => {
        e.preventDefault();
        // doing validation 
        valid()
        if (errorsObj.email || errorsObj.password) {
            return
        }
        login(form)
    }
    // validation form
    const valid = () => {
        if (!form.email) {
            errorsObj.email = "מייל לא יכול להיות ריק";
        }
        else if (!regEmail.test(form.email)) {
            errorsObj.email = "מייל לא תקין";
        }
        if (!form.password || form.password.length > 25 || form.password.length < 5) {
            errorsObj.password = "סיסמא אינה תקינה"
        }
        setErrors(errorsObj)
    }
    // doing login request
    const login = async (_dataBody) => {
        try {
            const { data } = await apiPost(LOGIN_ROUTE, _dataBody)
            if (data.token) {
                localStorage.setItem(TOKEN_KEY, data.token)
                dispatch(getUser())
                nav('/')
            }
        } catch (err) {
            if (err.response.data.wrongPassword) {
                setErrors({ ...errorsObj, resp: "סיסמא שגויה" })
            } else if (err.response.data.wrongEmail) {
                setErrors({ ...errorsObj, resp: "אימייל לא קיים במערכת" })
            }
        }
    }
    // when trying to login whith google
    const handleCallbackResponse = (response) => {
        let userObject = jwt_decode(response.credential);
        if (userObject.email_verified) {
            loginWhithGoogle(userObject)
        }
    }
    // doing login request
    const loginWhithGoogle = async (userObject) => {
        let url = "http://localhost:3001/users/loginWhithGoogle?verified=true";
        let objectToServer = {
            email: userObject.email
        }
        const { data } = await apiPost(LOGIN_WITH_GOOGLE_ROUTE + "?verified=true", objectToServer)
        if (data.wrongEmail) {
            setErrors({ ...errorsObj, resp: "אימייל לא קיים במערכת" })
        }
        if (data.token) {
            localStorage.setItem(TOKEN_KEY, data.token)
            dispatch(getUser())
            nav('/')
        }
    }

    //google auth 
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "909998606477-oenh3jinn2q2n93toiv1ncvpf2o4ms9g.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.querySelector("#singInDiv"),
            { theme: "outline", size: "large" }
        )
        google.accounts.id.prompt()
    }, [])
    return (
        <div style={{ height: '80vh' }} className='justify-content-center pt-5 d-flex container'>
            <div dir='rtl' className='col-lg-5 col-md-8 col-12'>
                <h1 className='display-4 text-center pb-5'>התחברות</h1>
                <form className='px-4 p-md-0' onSubmit={onSub} >
                    <div>
                        <label>כתובת מייל</label>
                        <div>

                            <div className='col-12'></div>
                            <input value={form.email} onChange={e => setForm({ email: e.target.value })} type="text" className={`col-12 ${style.formCtrl} ${style.myShadow}`} />
                        </div>
                        {errors.email && <small className="text-danger d-block">{errors.email}</small>}
                    </div>
                    <div className='pt-3'>
                        <label>סיסמא</label>
                        <div className={`d-flex ${style.myShadow} ${style.formCtrl} ${style.formCtrlPassoword} align-items-center`}>
                            <input value={form.password} onChange={e => setForm({ password: e.target.value })} type={eye} className={`col-11 ${style.formPassword}`} />
                            {eye === 'password' ?
                                <FaEyeSlash style={{ cursor: 'pointer' }} onClick={() => setEye('text')} className='me-auto ms-2 ' fontSize={'20px'} /> :
                                <FaEye style={{ cursor: 'pointer' }} onClick={() => setEye('password')} className='me-auto ms-2' fontSize={'20px'} />
                            }
                        </div>
                        {errors.password && <small className="text-danger d-block">{errors.password}</small>}
                        {errors.resp && <small className="text-danger d-block">{errors.resp}</small>}
                        <p className={`text-start pt-2 ${style.forgotPassword} me-auto col-4 col-md-3`}>שכחתי סיסמא</p>
                    </div>
                    <div className='justify-content-center d-flex pt-5'>
                        <Button type='submit' className={`mx-4 ${style.btn}`} variant="contained" color="success" sx={{ width: '100%', fontSize: '1.1em' }}>התחבר</Button>
                        <Button type='button' className={`mx-4 ${style.btn}`} onClick={() => nav('/signUp')} variant="contained" color="success" sx={{ width: '100%', fontSize: '1.1em' }}>הרשמה</Button>
                    </div>

                    <div className='py-5'>
                        <p className='text-center'>התחבר דרך</p>
                        <div className='d-flex justify-content-center'>
                            <div className='col-12 d-flex justify-content-center'>
                                <div className={`${style.externalLogin} mx-2 overflow-hidden d-flex align-items-center`}>
                                    <p className='p-0 m-0 mx-1'>facebook</p>
                                    <div>
                                        <img src={facebookPic} alt="facebook" width={'30px'} />
                                    </div>
                                </div>
                                <div id='singInDiv' className={`${style.externalLogin} mx-2 overflow-hidden d-flex align-items-center`}>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login