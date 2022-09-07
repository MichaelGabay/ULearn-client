import React from 'react'

const AboutPageCourse = ({courseInfo}) => {
  return (
    <div className='px-5'>
      <p style={{fontSize:"18px",whiteSpace:"pre-wrap"}}>{courseInfo}</p>
    </div>
  ) 
}

export default AboutPageCourse