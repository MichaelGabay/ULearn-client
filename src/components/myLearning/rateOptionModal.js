import { Box, CircularProgress, Modal, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import "./rateOptionModal.css"
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_RATING_ROUTE, UPDAT_RATING_ROUTE } from '../../shared/constant/url';
import { apiDelete, apiPut } from '../../shared/services/services';
import { updateAddRating } from '../../shared/redux/features/userSlice';
let isLeav = false;
const RateOptionModal = ({ openRateOptionModal, setOpenRateOptionModal, rating, shortId, setIsRatemModalOptionOpen }) => {
    const { user } = useSelector(store => store.userReducer)
    const [isDelClick, setIsDelClick] = useState(false)
    const [isEditClick, setIsEditClick] = useState(false)
    const [rateInfo, setRateInfo] = useState("בחר דירוג")
    const [rateValue, setRateValue] = useState(rating);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    // styles
    const styeModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        border: 'none !impotant',
        boxShadow: 24,
        p: 3,
        outline: "none",
    };
    const loadingStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100vh",
        zIndex: "5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
    // delete rating
    const deletRating = async () => {
        setLoading(true)
        await apiDelete(DELETE_RATING_ROUTE + `?coursShortId=${shortId}&rating=${rating}`)
        let temp = JSON.parse(JSON.stringify(user.myLearning))
        temp.forEach(item => {
            if (item.ShortIdCourse == shortId) {
                item.rating = 0;
                return
            }
        })
        setLoading(false)
        dispatch(updateAddRating(temp))
        setOpenRateOptionModal(false)
        setIsRatemModalOptionOpen(false)
    }
    // update rating
    const onSave = async () => {
        if (rateValue == null) {
            alert("אם את לא רוצה לדרג, פשוט סגור")
            return;
        }
        setLoading(true)
        await apiPut(UPDAT_RATING_ROUTE + `?coursShortId=${shortId}&rating=${rating}&newRating=${rateValue}`)
        let temp = JSON.parse(JSON.stringify(user.myLearning))
        temp.forEach(item => {
            if (item.ShortIdCourse == shortId) {
                item.rating = rateValue;
            }
        })
        dispatch(updateAddRating(temp))
        setLoading(false)
        setOpenRateOptionModal(false)
        setIsRatemModalOptionOpen(false)
    }
    // for hover information
    const getInfoRate = (value) => {
        let info = "בחר דירוג";
        let options = ["נורא", "גרוע מאוד", "לא מה שציפיתי בכלל", "די מאוכזב", "ממוצע", "יכול להיות יותר טוב", "טוב", "טוב, מה שציפיתי", "מדהים", "מעל המצופה"]
        switch (value) {
            case 0.5:
                info = options[0];
                break
            case 1:
                info = options[1];
                break
            case 1.5:
                info = options[2];
                break
            case 2:
                info = options[3];
                break
            case 2.5:
                info = options[4];
                break
            case 3:
                info = options[5];
                break
            case 3.5:
                info = options[6];
                break
            case 4:
                info = options[7];
                break
            case 4.5:
                info = options[8];
                break
            case 5:
                info = options[9];
                break
        }
        return info;
    }
    const onHoverRate = (event, value) => {
        if (!isLeav) {
            setRateInfo(getInfoRate(value))
        }
        isLeav = false;
    }
    const onClickRate = async (event, value) => {
        setRateValue(value);
    }
    const onLeaveRate = () => {
        isLeav = true
        setRateInfo(getInfoRate(rateValue))

    }
    useEffect(() => {
        setRateInfo(getInfoRate(rating))
    }, [])

    return (
        <Modal
            keepMounted
            open={openRateOptionModal}
            onClose={(e) => { setOpenRateOptionModal(false); e.stopPropagation() }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        ><>
                {
                    !isEditClick ?
                        <>
                            {
                                !isDelClick ?
                                    // view option mode
                                    <Box onClick={e => e.stopPropagation()} sx={styeModal}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <AiOutlineClose onClick={() => { setOpenRateOptionModal(false); setIsRatemModalOptionOpen(false) }} cursor="pointer" size={20} />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: "700" }} variant='p'>הדירוג שלך</Typography>
                                            </Box>
                                        </Box>
                                        <Box className='ratOptionModal-rating'>
                                            <Box sx={{ display: "flex", justifyContent: "end" }}>
                                                <Rating precision={0.5} value={rating} readOnly />
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "end", paddingTop: "28px" }}>
                                                <Box onClick={() => { setIsDelClick(true) }} className='ratOption-del-btn'>   <Typography sx={{ fontWeight: "700" }} variant='p'>מחק דירוג</Typography></Box>
                                                <Box onClick={() => setIsEditClick(true)} className='ratOption-edit-btn'>  <Typography sx={{ fontWeight: "700" }} variant='p'>עריכת דירוג</Typography></Box>
                                            </Box>
                                        </Box>
                                    </Box> :
                                    // delete Mode
                                    <Box onClick={e => e.stopPropagation()} sx={styeModal}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <AiOutlineClose onClick={() => { setOpenRateOptionModal(false); setIsRatemModalOptionOpen(false) }} cursor="pointer" size={20} />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: "700" }} variant='p'>מחיקת הדירוג שלך</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ textAlign: "end" }}>
                                            <Typography sx={{ fontWeight: "400", paddingTop: "12px" }} variant='subtitle1'>אתה בטח שאתה רוצה למחוק</Typography>
                                        </Box>
                                        <Box className='ratOptionModal-rating'>
                                            <Box sx={{ display: "flex", justifyContent: "end", paddingTop: "14px" }}>
                                                <Box onClick={() => setIsDelClick(false)} className='ratOption-del-btn'>   <Typography sx={{ fontWeight: "700" }} variant='p'>ביטול</Typography></Box>
                                                <Box onClick={deletRating} className='ratOption-edit-btn'>   <Typography sx={{ fontWeight: "700" }} variant='p'>כן מחק</Typography></Box>
                                            </Box>
                                        </Box>
                                    </Box>}
                        </> :
                        // edit mode
                        <Box sx={styeModal}>
                            <Box >
                                <Box>
                                    <AiOutlineClose onClick={() => { setOpenRateOptionModal(false); setIsRatemModalOptionOpen(false) }} cursor="pointer" size={20} />
                                </Box>
                            </Box>

                            <Box sx={{ textAlign: "center", paddingTop: "10px" }}>
                                <Typography variant='h6' fontWeight={600}>{rateInfo}</Typography>
                            </Box>
                            <Box className='rateModal-rating' sx={{ display: "flex", justifyContent: "center" }}>
                                <Rating
                                    defaultValue={rating}
                                    onMouseLeave={onLeaveRate}
                                    onChangeActive={onHoverRate} name="half-rating" precision={0.5}
                                    onChange={onClickRate}
                                />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "end", paddingTop: "28px" }}>
                                <Box onClick={onSave} className='ratOption-edit-btn'>  <Typography sx={{ fontWeight: "700" }} variant='p'>שמור שינויים</Typography></Box>
                            </Box>
                        </Box>
                }
                {loading && <Box sx={loadingStyle}>
                    <CircularProgress size={50}
                    />
                </Box>
                }
            </>
        </Modal >
    )
}

export default RateOptionModal