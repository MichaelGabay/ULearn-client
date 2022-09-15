import { Box, CircularProgress, Modal, Rating, Typography } from '@mui/material';
import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { addRating, updateAddRating } from '../../shared/redux/features/userSlice';
import "./rateModal.css"
let isLeav = false;
const RateModal = ({ openRateModal, setOpenRateModal, shortId, setIsRatemModalOpen }) => {
    const dispatch = useDispatch()
    const [rateInfo, setRateInfo] = useState("בחר דירוג")
    const [rateValue, setRateValue] = useState(-1);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.userReducer)
    // styles
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
    // when i moving on the stars tell me what is each one
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
    const onSave = async () => {
        if (rateValue == null) {
            alert("אם את לא רוצה לדרג, פשוט סגור")
            return;
        }
        setLoading(true)
        await dispatch(addRating({ shortId, value: rateValue }));
        let temp = JSON.parse(JSON.stringify(user.myLearning))
        temp.forEach(item => {
            if (item.ShortIdCourse == shortId) {
                item.rating = rateValue;
            }
        })
        setLoading(false)
        dispatch(updateAddRating(temp))
        setOpenRateModal(false)
        setIsRatemModalOpen(false)
    }

    return (
        <Modal
            keepMounted
            open={openRateModal}
            onClose={(e) => { setOpenRateModal(false); e.stopPropagation() }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        ><>
                <Box onClick={e => e.stopPropagation()} sx={styleModal}>
                    <Box>
                        <AiOutlineClose onClick={() => { setOpenRateModal(false); setIsRatemModalOpen(false) }} cursor="pointer" size={20} />
                    </Box>
                    <Box sx={{ textAlign: "center", paddingTop: "10px" }}>
                        <Typography fontWeight={600} variant='h5'>?בכמה תרצה לדרג קורס זה</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", paddingTop: "10px" }}>
                        <Typography variant='h6' fontWeight={600}>{rateInfo}</Typography>
                    </Box>
                    <Box className='rateModal-rating' sx={{ display: "flex", justifyContent: "center" }}>
                        <Rating
                            onMouseLeave={onLeaveRate}
                            onChangeActive={onHoverRate} name="half-rating" precision={0.5}
                            onChange={onClickRate}
                        />
                    </Box>
                    {rateValue != -1 &&
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Box onClick={onSave} className='rateModel-saveBtn'><Typography>שמור והמשך</Typography></Box>
                        </Box>}
                </Box>
                {loading &&
                    <Box sx={loadingStyle}>
                        <CircularProgress size={50}
                        />
                    </Box>
                }
            </>
        </Modal>
    )
}

export default RateModal