import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { indigo, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FaArrowAltCircleUp } from "react-icons/fa";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../shared/redux/features/wishListSlice";
import { useNavigate } from "react-router-dom";
import { addToMyCart } from "../../shared/redux/features/cartSlice";
import ReactWhatsapp from "react-whatsapp";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BoxFavorite({ course }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector((store) => store.userReducer);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const sendToCourse = () => {
    if (
      user?.myLearning.find(
        (element) => element.ShortIdCourse == course.short_id
      )
    ) {
      nav(`/course?shortId=${course.short_id}`);
    } else {
      nav(`/coursePage?shortId=${course.short_id}`);
    }
  };
  const addToCart = async () => {
    dispatch(addToMyCart({ shortId: course.short_id }));
  };

  return (
    <>
      <Card elevation={12} sx={{ maxWidth: "100%" }}>
        <CardMedia
          component="img"
          height="150px"
          image={course.img_url}
          alt="Paella dish"
        />
        <CardContent sx={{ height: "40px" }}>
          <Typography variant="h6">{course.name}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={(e) => {
              dispatch(addToWishList(course.short_id));
              e.stopPropagation();
            }}
            variant="text"
            aria-label="add to favorites"
          >
            <FavoriteIcon color="error" />
          </IconButton>
          <ReactWhatsapp style={{border:"none",background:"none"}} number="972585236376" message={`http://localhost:3000/coursePage?shortId=${course.short_id}`}>
            <IconButton aria-label="share">
              <ShareIcon
                sx={{ color: "#283593" }}
              />
            </IconButton>
          </ReactWhatsapp>
          <IconButton onClick={() => sendToCourse()} aria-label="arrow">
            <FaArrowAltCircleUp
              color="#455a64
"
            />
          </IconButton>
          {!user?.myLearning.find(
            (element) => element.ShortIdCourse == course.short_id
          ) && (
              <IconButton
                title="Add to cart"
                onClick={() => addToCart()}
                aria-label="Add to cart"
              >
                <LocalMallIcon />
              </IconButton>
            )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse dir="rtl" in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ whiteSpace: "pre-wrap" }} paragraph>{course.info}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
