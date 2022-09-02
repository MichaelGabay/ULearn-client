import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { addToWishList } from "../../shared/redux/features/wishListSlice";
import style from "./course.module.css"

const CourseBox = ({ course }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userReducer);
  const { wishList } = useSelector((store) => store.wishListReducer);
  const [isVerify, setIsVerify] = useState(false);

  useEffect(() => {
    if (
      user?.myLearning.find((item) => item.ShortIdCourse == course.short_id)
    ) {
      setIsVerify(true);
    }
  }, [user]);

  return (
    <Card
      className={`${style.hoverBox}`}
      onClick={() => {
        !isVerify
          ? nav(`/CoursePage?shortId=${course.short_id}`)
          : nav(`/course?shortId=${course.short_id}`);
      }}
      elevation={24}
      sx={{ width: 345, position: "relative" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={course.img_url}
          alt={course.name}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography sx={{ margin: '0 auto', textAlign: 'center' }} gutterBottom variant="h5" component="div">
            {course.name}
          </Typography>
            <Button color="success" variant="text">
              <FaArrowAltCircleUp size={30} />
            </Button>
          <div>
            {user &&
              <div className={style.heartPostion}>

                {!wishList?.find((item) => item.short_id == course.short_id) ? (
                  <Button
                    className={`${style.hoverIcon}`}
                    sx={{ width: 'auto' }}
                    onClick={(e) => {
                      dispatch(addToWishList(course.short_id));
                      e.stopPropagation();
                    }}
                    color="error"
                    variant="text"
                  >
                    <BsHeart size={28} />
                  </Button>
                ) : (
                  <Button
                    className={`${style.hoverIcon}`}
                    sx={{ width: 'auto' }}
                    onClick={(e) => {
                      dispatch(addToWishList(course.short_id));
                      e.stopPropagation();
                    }}
                    color="error"
                    variant="text"
                  >
                    <BsHeartFill size={28} />
                  </Button>
                )}
              </div>
            }
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseBox;
