import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaCheckCircle, FaArrowAltCircleUp } from 'react-icons/fa'
import { Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
export default function ThankYouOrder() {
  const nav = useNavigate()
  const [query] = useSearchParams()
  return (
    <div style={{ width: '100%' }} className='bg-dark text-light'>
      <div dir='rtl' style={{ height: '94vh' }} className='container d-flex justify-content-center text-center align-items-center'>
        <div>
          <Typography variant="h2" gutterBottom className="py-5" >תודה רבה!</Typography>
          <FaCheckCircle color='green' className='mb-5' size={100} />
          <Typography variant="h5" gutterBottom className="py-2 " >תודה שבחרת לקנות קורס זה,אנו מודים לך ומעריכים שאתה נותן לנו רגע מזמנך. ידע זה כוח! המשך למידה נהדרת!</Typography>
          <Button variant="outlined" color='warning' onClick={() => nav(`/course?shortId=${query.get("shortId")}`)} className=' mt-5 mb-5'>
            למעבר לקורס <FaArrowAltCircleUp className='mx-2' size={30} /></Button>

        </div>
      </div>
    </div>
  )
}
