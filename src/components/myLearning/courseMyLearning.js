import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, Rating } from "@mui/material"
import "./myLearning.css"
import { FiMoreVertical } from "react-icons/fi"
import playPic from "../../assets/images/myLearning/playPic.png"
import noImagCoursePic from "../../assets/images/coursePage/noImageCourse.webp"
import { useNavigate } from 'react-router-dom'

const CourseMyLearning = ({ course, myLearning }) => {
    const [progres, setProgres] = useState(0)
    const nav = useNavigate()
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
    return (
        <Grid item xl={3} md={3} sm={4} xs={6}>
            <Box className='myLearning-course'>
                <Box style={{ backgroundImage: `url(${!course.img_url ? noImagCoursePic : course.img_url})` }} className="myLearning-imageCourse">
                    <Box sx={{ display: "flex", justifyContent: "start", padding: "6px" }}>
                        <Box className='myLearning-more-icon'>
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
                <Box sx={{ paddingTop:"4px",display: "flex",flexWrap:"wrap", justifyContent: "space-between" }}>
                    <Box >
                        <Typography  variant='subtitle2' component="h4">{progres ? `${progres} הושלמו` : "התחל קורס"}</Typography>
                    </Box>
                    <Box sx={{textAlign:"end",cursor:"pointer"}} className='myLearning-rating'>
                        <Rating  readOnly />
                        <Typography sx={{margin:0,paddingLeft:"4px"}} variant='subtitle2' component="h4">השאר דירוג</Typography>
                    </Box>
                </Box>

            </Box>
        </Grid>
    )
}

export default CourseMyLearning