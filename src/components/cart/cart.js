import React, { useEffect } from "react";
import style from "./cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  addToMyCart,
  buyAllCart,
  deleteAllCart,
} from "../../shared/redux/features/cartSlice";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../shared/services/services";
import { BUY_COURSE_ROUTE } from "../../shared/constant/url";
import { getUser } from "../../shared/redux/features/userSlice";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import PayPalFromCart from "../../shared/payment/payPalFromCart";

export default function Cart({ setIsCartOpen, firstTime }) {
  const { cart, isCartOpen } = useSelector((store) => store.cartReducer);
  const [isCheckOut, setIsCheckOut] = useState(false)
  const [courseToBuy, setCourseToBuy] = useState({});
  const [isBuyAllCart, setIsBuyAllCart] = useState(false)
  const [sum, setSum] = useState(0);
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    calculateAmount();
  }, [cart]);
  const calculateAmount = () => {
    let amount = 0;
    cart?.forEach((item) => {
      amount += item.price;
    });
    setSum(amount);
  };
  const removeFromCart = (shortId) => {
    dispatch(addToMyCart({ shortId }));
  };
  const cleenCart = () => {
    dispatch(deleteAllCart());
  };
  const buyAllTheCart = async (empt) => {
    try {
      await dispatch(buyAllCart());
      nav("/myLearning");
    } catch (err) {
      alert("error");
    }
  };
  const buyCourse = async (shortId) => {
    try {
      let resp = await apiPost(BUY_COURSE_ROUTE + `?shortId=${shortId}`);
      if (resp.status == 200) {
        dispatch(getUser());
        nav(`/order/thankYou?shortId=${shortId}`);
      }
    } catch (err) {
      alert("error");
    }
  };
  if (firstTime) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${isCartOpen && style.cartOpen} ${!isCartOpen && firstTime && style.cartClose
          }`}
      >
        {cart?.length == 0 && (
          <div className="h-100  d-flex align-items-center justify-content-center">
            <div >
              <h2 className="text-center mt-1">העגלה ריקה</h2>
              <div className={style.cartIcon}>
                <BsCart4 />
              </div>
            </div>
          </div>
        )}
        <div className={cart?.length&&style.scroll}>

          {!isCheckOut && !isBuyAllCart ? cart?.map((item) => (
            <div key={item.short_id} className={`${style.product}`}>
              <Card
                sx={{
                  display: "flex",

                }}
              >
                {/* product info */}
                <div className="col-6 p-2">
                  <Typography className="w-100" sx={{ fontSize: '15px' }} variant="subtitle1">
                    {item.name}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ fontSize: '15px' }} color="textSecondary">
                    {item.categoryName}
                  </Typography>
                  <p style={{ fontSize: "13px" }} className="text-muted m-0">
                    {item.price == 0 ? "חינם" : `₪${item.price}`}
                  </p>
                  <FaTrashAlt
                    onClick={() => removeFromCart(item.short_id)}
                    color="#263238"
                  />
                  <Button
                    sx={{ marginRight: '12px' }}
                    onClick={() => {
                      if (item.price == 0) {
                        buyCourse(item.short_id);
                        setIsCartOpen(false)
                        return;
                      }
                      setCourseToBuy(item)
                      setIsCheckOut(true)
                    }}
                    color="secondary"
                    variant="outlined"
                  >
                    קנה קורס
                  </Button>
                </div>

                <div className="col-6 d-flex align-items-center ps-3">
                  <img className="shadow-lg" src={item.img_url} width={"100%"} height={'90px'} alt="" />
                </div>
              </Card>
            </div>
          )) : <div className="mt-3 text-center">
            {isCheckOut && <PayPalFromCart setIsCheckOut={setIsCheckOut} buyCourse={buyCourse} name={courseToBuy.name} price={courseToBuy.price} short_id={courseToBuy.short_id} />}
            {isBuyAllCart && <PayPalFromCart setIsCheckOut={setIsBuyAllCart} buyCourse={buyAllTheCart} name={"buying all cart"} price={+sum} short_id={courseToBuy.short_id} />}
            <Button
              color="success"
              variant="contained"
              onClick={() => {setIsCheckOut(false);setIsBuyAllCart(false)}}
            >
              חזור
            </Button></div>}
        </div>
        <div></div>
        {cart?.length > 0 && (
          <div style={{ position: "absolute", bottom: 0 }}>
            <Typography
              variant="subtitle1"
              className="p-2"
              color="textSecondary"
            >
              {`סה"כ: ₪${sum}`}
            </Typography>

            <div className="d-flex  p-3">
              <Button
                color="secondary"
                variant="contained"
                className="ms-2"
                onClick={cleenCart}
              >
                נקה עגלה
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  setIsCheckOut(false)
                  if (sum == 0) {
                    buyAllTheCart()
                    return;
                  }
                  setIsBuyAllCart(true)
                }}
              >
                קנה את כל העגלה
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
