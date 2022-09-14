import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, Rating, Paper, Modal } from "@mui/material"
import "./myLearning.css"
import { FiMoreVertical } from "react-icons/fi"
import { IoMdShareAlt } from "react-icons/io"
import { AiFillStar, AiOutlineMail, AiOutlineClose } from "react-icons/ai"
import { GrTwitter } from "react-icons/gr"
import { BsWhatsapp, BsFacebook, BsTelegram } from "react-icons/bs"
import playPic from "../../assets/images/myLearning/playPic.png"
import noImagCoursePic from "../../assets/images/coursePage/noImageCourse.webp"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateMoreOpen } from '../../shared/redux/features/myLearningSlice'
import { addToWishList } from '../../shared/redux/features/wishListSlice'
const CourseMyLearning = ({ course, myLearning, wishList }) => {
    const [progres, setProgres] = useState(0)
    const [openShareModal, setOpenShareModal] = useState(false)
    const nav = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (myLearning) updateProgres();
    }, [myLearning])
    const updateProgres = () => {
        let myLearningCourse = myLearning?.find(item => item.ShortIdCourse == course.short_id);
        if (course?.lessonLength) {
            let progresPercent = Math.ceil((myLearningCourse?.lessonsViewsId.length * 100) / course?.lessonLength);
            if (progresPercent) {
                setProgres(progresPercent + "%")
            }
        }
    }
    const openMore = event => {
        event.stopPropagation();
        dispatch(updateMoreOpen({ shortId: course.short_id }))
    }
    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        border: 'none !impotant',
        boxShadow: 24,
        p: 3,
        outline: "none"
    };
    return (
        <Grid item xl={3} md={3} sm={4} xs={6}>
            <Box className='myLearning-course'>
                <Box style={{ backgroundImage: `url(${!course.img_url ? noImagCoursePic : course.img_url})` }} className="myLearning-imageCourse">
                    <Box sx={{ display: "flex", justifyContent: "start", padding: "6px" }}>
                        <Box onClick={openMore} className='myLearning-more-icon'>
                            <FiMoreVertical size={15} />
                        </Box>
                    </Box>
                    <Box className='myLearning-playIcon'>
                        <img className='myLearning-playIcon-self' onClick={() => nav(`/course?shortId=${course.short_id}`)} src={playPic}></img>
                    </Box>
                </Box>
                <Typography sx={{ fontSize: "15px", fontWeight: "600", paddingTop: "8px" }} variant='subtitle2' component="h2">{course.name}</Typography>
                <Typography className='myLearning-creator' variant='caption' component="h3">{`${course?.creator_id.fullName.firstName} ${course?.creator_id.fullName.lastName}`}</Typography>
                <Box className='myLearning-progres'>
                    <Box sx={{ width: progres, background: "purple", height: "2px" }}></Box>
                </Box>
                <Box sx={{ paddingTop: "4px", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <Box >
                        <Typography variant='subtitle2' component="h4">{progres ? `${progres} הושלמו` : "התחל קורס"}</Typography>
                    </Box>
                    <Box sx={{ textAlign: "end", cursor: "pointer" }} className='myLearning-rating'>
                        <Rating readOnly />
                        <Typography sx={{ margin: 0, paddingLeft: "4px" }} variant='subtitle2' component="h4">השאר דירוג</Typography>
                    </Box>
                </Box>
                {course.isMoreOpen &&
                    <Paper className="myLearning-mor-paper" onClick={e => e.stopPropagation()} sx={{ padding: "16px", position: "absolute", top: "43px", right: "14px", width: "100%" }} elevation={3} square>
                        <Typography onClick={() => setOpenShareModal(true)} className='myLearning-option' variant='body1' component="p"><IoMdShareAlt size={25} className='ps-1' />שתף</Typography>
                        {wishList &&
                            !wishList?.find(
                                (item) => item.short_id == course.short_id)
                            ? <Typography onClick={() => dispatch(addToWishList(course.short_id))} className='myLearning-option' variant='body1' component="p"><AiFillStar size={25} className='ps-1' />הוסף למועדפים</Typography>
                            : <Typography onClick={() => dispatch(addToWishList(course.short_id))} className='myLearning-option' variant='body1' component="p"><AiFillStar size={25} className='ps-1' />הסר ממועדפים</Typography>
                        }
                    </Paper>
                }
            </Box>
            <Modal
                keepMounted
                open={openShareModal}
                onClose={(e) => { setOpenShareModal(false); e.stopPropagation() }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box onClick={e => e.stopPropagation()} sx={styleModal}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px" }}>
                        <Box onClick={() => setOpenShareModal(false)} sx={{ cursor: "pointer" }}><AiOutlineClose size={20} /></Box>
                        <Box>
                            <Typography variant='h5'>שתף קורס</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <input className='myLearning-modal-link' readOnly={true} value={`https://ulearnisrael.netlify.app/CoursePage?shortId=${course.short_id}`} style={{ overflow: "hidden" }} />
                        <Box onClick={() => navigator.clipboard.writeText(`https://ulearnisrael.netlify.app/CoursePage?shortId=${course.short_id}`)} className='myLearning-modal-btn'>
                            <Typography sx={{ color: "white" }} variant='h6'>העתק</Typography>
                        </Box>

                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-evenly", marginTop: "12px" }}>
                        <BsWhatsapp className='myLearning-shareIcon myLearning-green' />
                        <BsFacebook className='myLearning-shareIcon myLearning-blue' />
                        <GrTwitter className='myLearning-shareIcon myLearning-lightBlue' />
                        <BsTelegram className='myLearning-shareIcon myLearning-strongBlue' />
                        <AiOutlineMail className='myLearning-shareIcon myLearning-red' />
                    </Box>
                </Box>
            </Modal>
        </Grid>
    )
}

export default CourseMyLearning