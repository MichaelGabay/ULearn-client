import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightGreen, red, grey, yellow, blueGrey } from '@mui/material/colors';
import { useSelector, useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
// import style from "./navbar.module.css";
// modal
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import { useDispatch } from "react-redux";
import { getUser } from '../../redux/features/userSlice'
import { useEffect, useState } from 'react';
import { getMyCart, setIsCartOpen } from '../../redux/features/cartSlice';
import Cart from '../../../components/cart/cart';
import { getWishList } from '../../redux/features/wishListSlice';
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};
// end Modal
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 15,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const custom = createTheme({
  palette: {
    primary: {
      main: yellow['200']
    },
    secondary: {
      main: grey["900"],
    },
    error: {
      main: red["A200"],
    },
    success: {
      main: lightGreen[800],
    },
    info: {
      main: grey['A100']
    }
  },
});
const pages = [{ name: 'הלימודים שלי', href: '/myLearning' }, { name: 'הקורסים שיצרתי', href: '/myCourses' }, { name: 'מועדפים', href: '/favourites' }, { name: 'צור קורס', href: '/createCourse' }];
const guestPages = [{ name: 'התחברות', href: '/login' }
  , { name: 'הירשם', href: '/signUp' }];
const settings = [{ name: 'אזור אישי', href: '/myAccount' }, { name: 'התנתק', href: '/logout' }];
const guestSettings = [{ name: 'התחברות', href: '/login' }
  , { name: 'הירשם', href: '/signUp' }];

const NavbarMatrial = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [isAwait, setIsAwait] = useState(true)
  const { user } = useSelector((store) => store.userReducer);
  const { cart } = useSelector((store) => store.cartReducer);
  const { isCartOpen } = useSelector(store => store.cartReducer);
  const [firstTime, setFirstTime] = useState(false);
  // updating store when the site loaded
  useEffect(() => {
    if (localStorage['token']) {
      dispatch(getUser())
    }
    setTimeout(() => {
      setIsAwait(false)
    }, 1000)
  }, [])
  // geeting cart and favourites
  useEffect(() => {
    if (user) {
      dispatch(getMyCart())
      dispatch(getWishList())
    }
  }, [user])
  const nav = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div onClick={() => dispatch(setIsCartOpen(false))}>
      <ThemeProvider theme={custom}>
        <AppBar position="fixed" sx={{ padding: '3px 0', direction: 'rtl' }} color='secondary' >
          <Container maxWidth="xl">
            <Toolbar disableGutters >
              <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => nav("/")}
                sx={{
                  '&:hover': {
                    cursor: "pointer",
                    color: "silver"
                  },
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                ULearn
              </Typography>
              <SchoolIcon className='ms-4' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' }
                  }}
                >
                  {(!user ? guestPages : pages).map((page) => (
                    <MenuItem dir='rtl' key={page.name} onClick={() => {
                      handleCloseNavMenu()
                      nav(page.href)
                    }
                    }>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                onClick={() => nav("/")}
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  '&:hover': {
                    color: grey["600"],
                    transitionDuration: '1s'
                  },

                  mr: 2,
                  display: { xs: 'flex', md: 'none', alignItems: 'center' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                ULearn
                <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {(!user ? guestPages : pages).map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => {
                      handleCloseNavMenu()
                      nav(page.href)
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0, position: 'relative' }}>

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {!isAwait && user &&
                      <Avatar variant='square' sx={{ width: 'auto', borderRadius: '50%', padding: '0 8px', bgcolor: blueGrey['50'], fontWeight: 'bold', color: 'black' }} alt="Remy Sharp" src="/static/images/avatar/2.jpg">{user.fullName.firstName[0] + user.fullName.lastName[0]}</Avatar>
                    }
                    {!isAwait && !user &&
                      <Avatar variant='square' sx={{ width: 'auto', borderRadius: '12px', padding: '0 10px', fontWeight: 'bold', color: 'black' }} alt="Remy Sharp" src="/static/images/avatar/2.jpg">אורח</Avatar>
                    }
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '50px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {(!user ? guestSettings : settings).map((setting) => (
                    <MenuItem sx={{ direction: 'rtl' }} key={setting.name} onClick={() => {
                      if (setting.href === '/logout') {
                        handleOpen()
                      } else {
                        nav(setting.href)
                      }
                      handleCloseUserMenu()
                    }}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
                {!isAwait && user &&
                  <div className='test' onClick={(e) => { dispatch(setIsCartOpen(!isCartOpen)); e.stopPropagation(); setFirstTime(true) }}>
                    <IconButton aria-label="cart" color='info' sx={{ position: 'absolute', left: '110%', top: "5%" }}>
                      <StyledBadge badgeContent={cart?.length} color="success" >
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                  </div>
                }

              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {<Cart setIsCartOpen={setIsCartOpen} firstTime={firstTime} />}
        {/* modal logOut*/}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          // onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open} >
            <Box sx={modalStyle} >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                ?האם אתה בטוח שאתה רוצה להתנתק
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button onClick={() => {
                  handleClose()
                  handleCloseUserMenu()

                }} variant="contained" color='secondary' sx={{ marginX: '10px' }} disableElevation>
                  לא
                </Button>
                <Button onClick={() => {
                  nav('/logout')
                  handleClose()
                }} variant="contained" color='secondary' sx={{ marginX: '10px' }} disableElevation>
                  כן
                </Button>

              </Box>
            </Box>
          </Fade>
        </Modal>
        {/* modal */}

      </ThemeProvider>
    </div>
  );
};
export default NavbarMatrial;
