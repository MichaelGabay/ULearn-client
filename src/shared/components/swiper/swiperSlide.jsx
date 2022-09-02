import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


// import required modules
import { FreeMode, Pagination } from "swiper";
import './swiperSlide.css'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const SwiperSlideX = ({ data, slider }) => {

    const nav = useNavigate()
    return (
        <Swiper
            dir='rtl'
            slidesPerView={slider}
            spaceBetween={5}
            freeMode={true}

            pagination={{
                clickable: true
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
        >
            {data?.map(item =>
                <SwiperSlide key={item._id} className='h-100 p-3'>

                    <Card onClick={() => nav(`/course?shortId=${item.short_id}`)} elevation={10} sx={{ width: '100%' }}>
                        <CardActionArea className='overflow-hidden' style={{ height: '140px' }}>
                            <CardMedia
                                component="img"
                                height="200px"
                                image={item.img_url}
                                alt={item.name}
                            />

                        </CardActionArea>
                    </Card>


                </SwiperSlide>

            )}
        </Swiper>
    )
}
