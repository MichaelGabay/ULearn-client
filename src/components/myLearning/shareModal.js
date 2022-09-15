import React from 'react'
import "./myLearning.css"
import { Modal, Box, Typography } from "@mui/material"
import { AiOutlineMail, AiOutlineClose } from "react-icons/ai"
import { GrTwitter } from "react-icons/gr"
import { BsWhatsapp, BsFacebook, BsTelegram } from "react-icons/bs"
const ShareModal = ({ openShareModal, setOpenShareModal,shortId }) => {
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
                    <input className='myLearning-modal-link' readOnly={true} value={`https://ulearnisrael.netlify.app/CoursePage?shortId=${shortId}`} style={{ overflow: "hidden" }} />
                    <Box onClick={() => navigator.clipboard.writeText(`https://ulearnisrael.netlify.app/CoursePage?shortId=${shortId}`)} className='myLearning-modal-btn'>
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
    )
}

export default ShareModal