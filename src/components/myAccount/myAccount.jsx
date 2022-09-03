import { Avatar, Button, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SchoolIcon from '@mui/icons-material/School';
import style from './myAccount.module.css'
import AuthUser from '../../shared/components/auth/authUser';
import { ReactFileInputCustom } from 'react-file-input-custom';
import useSimpleForm from '../../shared/hooks/useForm';
import { apiGet, apiPut } from '../../shared/services/services';
import { GET_USER_INFO_ROUTE, UPDAT_MY_INFO_ACOUNT_ROUTE } from '../../shared/constant/url';
import axios from 'axios';
const MyAccount = () => {
    const regEmail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    const nav = useNavigate()
    const [profileImagFile, setProfileImagFile] = useState(false);
    const [form, setForm, errors, setErrors, resetForm] = useSimpleForm({ firstName: "", lastName: "", phone: "", email: "" })
    const [masseg, setMasseg] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMyInfoAcount()
    }, [])
    // get user acoount information
    const getMyInfoAcount = async () => {
        let { data } = await apiGet(GET_USER_INFO_ROUTE)
        setLoading(false)
        delete data.myLearning;
        setForm({ firstName: data?.fullName?.firstName, lastName: data?.fullName?.lastName, phone: data?.phone, email: data?.email, imgProfile: data?.imgProfile })
    }
    const onSubmit = async e => {
        e.preventDefault()
        if (errors.firstName || errors.lastName || errors.email) {
            return
        }
        setLoading(true)
        let url = "";
        if (profileImagFile) {
            url = await uploadImage()
        }
        updateMyInfo(url)

    }
    // validation form
    useEffect(() => {
        if (form.email) {
            validate()
        }
    }, [form])
    // validation
    const validate = () => {
        let errorObj = {};
        if (!form.firstName.length) {
            errorObj.firstName = "חובה למלא שם"
        }
        else if (form.firstName.length < 2) {
            errorObj.firstName = "שם אינו תקין"
        }
        if (!form.lastName.length) {
            errorObj.lastName = "חובה למלא שם משפחה"
        }
        else if (form.lastName.length < 2) {
            errorObj.lastName = "שם משפחה אינו תקין"
        }
        if (!form.email) {
            errorObj.email = "חובה למלא אימייל";
        }
        else if (!regEmail.test(form.email)) {
            errorObj.email = "מייל לא תקין";
        }
        setErrors(errorObj)
    }
    // doing apdate request
    const updateMyInfo = async (url) => {
        let object = {
            fullName: {
                firstName: form.firstName,
                lastName: form.lastName
            },
            email: form.email,
            phone: form.phone,
            imgProfile: url
        }
        let { data } = await apiPut(UPDAT_MY_INFO_ACOUNT_ROUTE, object)
        if (data.modifiedCount) {
            setMasseg("השינויים נשמרו")
            setTimeout(() => {
                setMasseg("")
            }, 3000);
        }
        if (data.status == false) {
            setMasseg("אימייל זה קיים במערכת")
            setTimeout(() => {
                setMasseg("")
            }, 3000);
        }
        getMyInfoAcount()
        setLoading(false)
    }
    // uploading image
    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", profileImagFile);
        formData.append("upload_preset", "miki101")
        let resp = await axios.post("https://api.cloudinary.com/v1_1/michael-gabay/image/upload", formData)
        return resp.data.url
    }
    return (
        <>
            <AuthUser />
            {loading ? <CircularProgress sx={{ position: 'absolute', right: '50%', left: '50%', top: '50%', bottom: '50%' }} size={50} /> :
                <div dir='rtl' className="container bootstrap snippet mt-2">
                    <div className="row m-0 p-0">
                        <div className="col-3 d-flex align-items-center me-auto">
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                onClick={() => nav("/")}
                                sx={{
                                    '&:hover': {
                                        cursor: "pointer",
                                        color: "silver"
                                    },
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    fontSize: '30px'
                                }}
                            >
                                ULearn
                            </Typography>
                            <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '40px' }} />
                        </div>
                    </div>
                    <div className="row m-0 p-0  justify-content-center justify-content-md-around ">
                        <div className="col-md-4 col-auto">
                            <div className="d-flex flex-column align-items-center">
                                {form.email && !form?.imgProfile ? <Avatar
                                    alt={form.firstName}
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: '250px', height: '250px', fontSize: '35px', textAlign: "center" }}
                                >{form.firstName + " " + form.lastName}</Avatar>
                                    :
                                    <Avatar
                                        alt={form.firstName}
                                        src={form.imgProfile}
                                        sx={{ width: '250px', height: '250px', fontSize: '35px' }}
                                    >{form.firstName + " " + form.lastName}</Avatar>
                                }
                                <h6 className='my-3'>בחר תמונה להעלות...</h6>
                                <ReactFileInputCustom
                                    handleChange={(e) => setProfileImagFile(e.target.files[0])}
                                    classes={"p-2 w-100 w-lg-auto " + style.fileUpload}
                                    text="עדכן תמונת פרופיל"
                                    textColor="white"
                                    backgroundColor="green"
                                />
                                <Button onClick={() => { setForm({ imgProfile: "" }); setProfileImagFile(false) }} className='mt-2' variant="contained" color="error" sx={{ width: '30%', fontSize: '1.1em' }}>מחק תמונה</Button>

                            </div>
                            <hr />
                            <br />
                        </div>
                        <div className="col-md-7 col-10 ">
                            <hr />
                            <h1>אזור אישי</h1>
                            <form onSubmit={onSubmit} className="form mt-5">
                                <div className='d-md-flex justify-content-between d-block'>
                                    <div className='col-md-6 col-12 ps-md-5'>
                                        <label><h5>שם פרטי</h5></label>
                                        <input onChange={(e) => setForm({ firstName: e.target.value })} value={form.firstName} type="text" className={style.formCtrl + ' ' + style.myShadow} />
                                        {errors.firstName && (
                                            <small className="text-danger d-block">{errors.firstName}</small>
                                        )}
                                    </div>
                                    <div className='col-md-6 col-12  pe-md-5'>
                                        <label><h5>שם משפחה</h5></label>
                                        <input onChange={(e) => setForm({ lastName: e.target.value })} value={form.lastName} type="text" className={style.formCtrl + ' ' + style.myShadow} />
                                        {errors.lastName && (
                                            <small className="text-danger d-block">{errors.lastName}</small>
                                        )}
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <label><h5>טלפון</h5></label>
                                    <input onChange={(e) => setForm({ phone: e.target.value })} value={form.phone} type="text" className={style.formCtrl + ' ' + style.myShadow} />
                                </div>
                                <div className='mt-3'>
                                    <label><h5>כתובת מייל</h5></label>
                                    <input onChange={(e) => setForm({ email: e.target.value })} value={form.email} type="text" className={style.formCtrl + ' ' + style.myShadow} />
                                    {errors.email && (
                                        <small className="text-danger d-block">{errors.email}</small>
                                    )}

                                </div>
                                <div className='d-flex mt-5'>
                                    <Button className='ms-2' type='submit' variant="contained" color="info" sx={{ width: '30%', fontSize: '1.1em' }}>עדכן פרטים</Button>
                                    <Button type='button' onClick={() => nav(-1)} variant="contained" color="secondary" sx={{ width: '30%', fontSize: '1.1em' }}>חזור</Button>

                                </div>

                            </form>
                            <hr />
                            <small className="text-primary d-block">{masseg}</small>
                        </div>
                    </div>

                </div>}
        </>
    )
}

export default MyAccount