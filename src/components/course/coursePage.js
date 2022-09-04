import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FaCartPlus, FaRegHeart, FaHandHolding } from "react-icons/fa";
import { BsFillCartXFill } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  BUY_COURSE_ROUTE,
  GET_COURSE_PAGE_PROPERTIES,
} from "../../shared/constant/url";
import { getUser } from "../../shared/redux/features/userSlice";
import { apiGet, apiPost } from "../../shared/services/services";
import { useDispatch, useSelector } from "react-redux";
import { addToMyCart, getMyCart } from "../../shared/redux/features/cartSlice";
import { addToWishList } from "../../shared/redux/features/wishListSlice";
import PayPal from "../../shared/payment/payPal";
import screenImage from "../../assets/images/coursePage/05R7ApclhnnV0xTx4drU4BE-1..v1617290389.jpg"
import style from "./coursePage.module.css"
export default function CoursePage() {
  const [course, setCourseProperties] = useState({});
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [query] = useSearchParams();
  const nuv = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cartReducer);
  const { user } = useSelector((store) => store.userReducer);
  const { wishList } = useSelector((store) => store.wishListReducer);
  useEffect(() => {
    window.scrollTo(0, 0);
    getCourseProperties();
  }, []);
  // got course information
  const getCourseProperties = async () => {
    try {
      let { data } = await apiGet(
        GET_COURSE_PAGE_PROPERTIES + `?shortId=${query.get("shortId")}`
      );
      setCourseProperties(data);
    } catch (err) {
      console.log(err.response);
    }
  };
  // buy course
  const buyCourse = async () => {
    try {
      let resp = await apiPost(
        BUY_COURSE_ROUTE + `?shortId=${query.get("shortId")}`
      );
      if (resp.status == 200) {
        dispatch(getUser());
        nuv(`/order/thankYou?shortId=${query.get("shortId")}`);
      }
    } catch (err) {
      alert("error");
    }
  };
  const addToCart = async () => {
    dispatch(addToMyCart({ shortId: query.get("shortId") }));
  };

  if (user && cart && wishList) {
    return (
      <div style={{ minHeight: "90vh" }} className="container d-flex align-items-center">
        {course?._id &&
          <>
            <div>
              <div style={{ margin: "0 auto" }} className="col-md-6 p-2 position-relative ">
                <img src={screenImage} className="w-100" alt={course.name} />
                <div className={`overflow-hidden ${style.imagCourse}`} style={{ backgroundImage: `url(${course.img_url})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
              </div>
              <div style={{ margin: "0 auto" }} dir="rtl" className="col-md-6 text-center text-md-end mb-3">
                <h4>{`שם הקורס: ${course.name}`}</h4>
                <h4 >אודות הקורס:</h4>
                <p style={{ whiteSpace: "pre-wrap" }}>{course.info}</p>
                <h4>{course.price == 0 ? `חינם` : `מחיר: ₪${course.price}`}</h4>
                <h4>{`יוצר הקורס: ${course?.creatorName.fullName.lastName} ${course?.creatorName.fullName.firstName}`}</h4>
                <Box sx={{ margin: "0 auto" }} display={"flex"} width={"40%"} flexDirection={"column"}>
                  {cart &&
                    !cart?.find((item) => item.short_id == query.get("shortId")) ? (
                    <Button
                      onClick={addToCart}
                      className="mt-2"
                      variant="outlined"
                      color="success"
                      endIcon={<FaCartPlus />}
                    >
                      <p className="m-0 mx-2">הוסף לסל</p>
                    </Button>
                  ) : (
                    cart && (
                      <Button
                        onClick={addToCart}
                        className="mt-2"
                        variant="outlined"
                        color="error"
                        endIcon={<BsFillCartXFill />}
                      >
                        <p className="m-0 mx-2">הסר מהסל</p>
                      </Button>
                    )
                  )}
                  {wishList &&
                    !wishList?.find(
                      (item) => item.short_id == query.get("shortId")
                    ) ? (
                    <Button
                      onClick={() => dispatch(addToWishList(query.get("shortId")))}
                      className="mt-2"
                      variant="outlined"
                      color="success"
                      endIcon={<FaRegHeart />}
                    >
                      <p className="m-0 mx-2">הוסף למועדפים</p>
                    </Button>
                  ) : (
                    wishList && (
                      <Button
                        onClick={() =>
                          dispatch(addToWishList(query.get("shortId")))
                        }
                        className="mt-2"
                        variant="outlined"
                        color="error"
                        endIcon={<FaRegHeart />}
                      >
                        <p className="m-0 mx-2">הסר ממועדפים</p>
                      </Button>
                    )
                  )}
                  <Button
                    onClick={() => {
                      if (course.price == 0) {
                        buyCourse();
                        return
                      }
                      setIsCheckOut(state => !state);
                    }}
                    className="mt-2 mb-2"
                    variant="outlined"
                    color="info"
                    endIcon={<FaHandHolding />}
                  >
                    <p className="m-0 mx-2">קנה קורס</p>
                  </Button>
                  {isCheckOut && <PayPal price={course.price} name={course.name} buyCourse={buyCourse} />}
                </Box>

              </div>

            </div>
          </>}
      </div>
    );
  }
  if (!user)
    return (
      <div style={{ minHeight: "90vh" }} className="container d-flex align-items-center">
        {course?._id &&
          <>
            <div>
              <div style={{ margin: "0 auto" }} className="col-md-6 p-2 position-relative ">
                <img src={screenImage} className="w-100" alt={course.name} />
                <div className={`overflow-hidden ${style.imagCourse}`} style={{ backgroundImage: `url(${course.img_url})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
              </div>
              <div style={{ margin: "0 auto" }} dir="rtl" className="col-md-6 text-center text-md-end mb-3">
                <h4>{`שם הקורס: ${course.name}`}</h4>
                <h4 >אודות הקורס:</h4>
                <p style={{ whiteSpace: "pre-wrap" }}>{course.info}</p>
                <h4>{course.price == 0 ? `חינם` : `מחיר: ₪${course.price}`}</h4>
                <Box sx={{ margin: "0 auto" }} display={"flex"} width={"40%"} flexDirection={"column"}>
                  <Button
                    onClick={() => alert("אתה חייב להיות מחובר")}
                    className="mt-2"
                    variant="outlined"
                    color="success"
                    endIcon={<FaCartPlus />}
                  >
                    <p className="m-0 mx-2">הוסף לסל</p>
                  </Button>
                  <Button
                    onClick={() => alert("אתה חייב להיות מחובר")}
                    className="mt-2"
                    variant="outlined"
                    color="success"
                    endIcon={<FaRegHeart />}
                  >
                    <p className="m-0 mx-2">הוסף למועדפים</p>
                  </Button>
                  <Button
                    onClick={() => alert("אתה חייב להיות מחובר")}
                    className="mt-2 mb-2"
                    variant="outlined"
                    color="info"
                    endIcon={<FaHandHolding />}
                  >
                    <p className="m-0 mx-2">קנה קורס</p>
                  </Button>
                </Box>
              </div>
            </div>
          </>}
      </div>
    );

}
