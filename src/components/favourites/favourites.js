import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  Grid,
  ListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AuthUser from "../../shared/components/auth/authUser";
import { useDispatch, useSelector } from "react-redux";
import { amber, blue, grey, lime, pink, red } from "@mui/material/colors";
import BoxFavorite from "./boxFavorite";
import style from "./favorite.module.css";
import { getWishList } from "../../shared/redux/features/wishListSlice";

const Favourites = () => {
  const { wishList } = useSelector((store) => store.wishListReducer);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0);
    getFavorites()
  }, [])
  const getFavorites = async () => {
    await dispatch(getWishList())
    setLoading(false)
  }
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
  return (
    // <ThemeProvider theme={custom}>
    <>
      <AuthUser />
      {!loading ?
        <div dir="rtl" className={`${style.container} py-5`}>
          {wishList?.length > 0 ? (
            <div className={style.flexbox + " row"}>
              {wishList?.map((item) => (
                <div dir="ltr" key={item._id} className={style.box}>
                  <BoxFavorite course={item} />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1 className="text-center">עדיין לא הוספת מועדפים</h1>
            </div>
          )}
        </div>
        : <Box sx={loadingStyle}>
          <CircularProgress size={50}
          />
        </Box>
      }
    </>
    // </ThemeProvider>
  );
};

export default Favourites;
