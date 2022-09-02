import React, { useEffect, useState } from "react";
import {
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

const Favourites = () => {
  const { wishList } = useSelector((store) => store.wishListReducer);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    window.scrollTo(0, 0);
    if (wishList) {
      setLoading(false)
    }
  }, [wishList])
  const custom = createTheme({
    palette: {
      primary: amber,
      secondary: {
        main: pink["A200"],
      },
      error: {
        main: red["A200"],
      },
      success: {
        main: grey[900],
      },
      info: {
        main: blue["500"],
      },
    },
  });

  return (
    <ThemeProvider theme={custom}>
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
        : <CircularProgress sx={{ position: 'absolute', right: '50%', left: '50%', top: '50%', bottom: '50%' }} size={50} />
      }
    </ThemeProvider>
  );
};

export default Favourites;
