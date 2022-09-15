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
import ShareModal from './shareModal'
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
         <ShareModal setOpenShareModal={setOpenShareModal} openShareModal={openShareModal} shortId={course.short_id}/>
        </Grid>
    )
}

export default CourseMyLearning