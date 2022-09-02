import { Typography } from '@mui/material'
import { Toolbar } from '@mui/material'
import React from 'react'
import style from "./footer.module.css"
const Footer = () => {
  return (
    <div className={style.footer}>
      <div>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            '&:hover': {
              cursor: "pointer",
              color: "silver"
            },
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          ULearn
        </Typography>
      </div>
      <div className={style.creator}>
        <div className={style.divara}>© 2022 michael & yarin</div>
      </div>
    </div>
  )
}

export default Footer