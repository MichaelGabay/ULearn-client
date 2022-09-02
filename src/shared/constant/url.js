export const API_URL = "https://udemy-israel.herokuapp.com/";

// !URL SERVER ROUTES

//? --AUTH--
export const SIGN_UP_ROUTE = API_URL + "users";
export const LOGIN_ROUTE = API_URL + "users/login";
export const LOGIN_WITH_GOOGLE_ROUTE = API_URL + "users/loginWhithGoogle";
export const CHECK_TOKEN_ROUTE = API_URL + "users/checkToken";

//? --CATEGORIES--
export const GET_CATEGORIES_ROUTE = API_URL + "categories";

//? --COURSES--
export const ADD_COURSE_ROUTE = API_URL + "courses/addCourse";
export const UPDATE_COURSE_ROUTE = API_URL + "courses/updateCourse";
export const ADD_LESSON_ROUTE = API_URL + "courses/addLesson";
export const UPDATE_LESSON_ROUTE = API_URL + "courses/updateLesson";
export const DELETE_LESSON_ROUTE = API_URL + "courses/deleteLesson";
export const GET_COURSES_ROUTE = API_URL + "courses";
export const GET_COURSE_PAGE_PROPERTIES = API_URL + "courses/coursePage";
export const SEARCH_COURSES_ROUTE = API_URL + "courses/search";
export const ADD_QUESTION_ROUTE = API_URL + "courses/addQToLesson";
export const ADD_ANSSWER_ROUTE = API_URL + "courses/addAnswerToQuestion";
export const DELETE_QUESTION_FROM_LESSON = API_URL + "courses/deleteQLesson";
export const DELETE_COMMENT_FROM_QUESTION = API_URL + "courses/deleteAnswerFromQuestion";
export const UPDATE_ORDER_ROUTE = API_URL + "courses/updateOrder";
export const GET_THE_HOT_COURSE_ROUTE = API_URL + "courses/getTheHotCourse";


//? --user--
export const GET_MY_COURSES_ROUTE = API_URL + "users/getMyCourses";
export const DELETE_COURSE_ROUTE = API_URL + "courses/deleteCourse";
export const GET_COURSE = API_URL + "courses/course";
export const GET_USER_INFO_ROUTE = API_URL + "users/getMyInfoAcount";
export const UPDAT_MY_INFO_ACOUNT_ROUTE = API_URL + "users/editMyInfoAcount";
export const BUY_COURSE_ROUTE = API_URL + "users/buyOneCourse";
export const UPDATE_VIEW_LESSON_ROUTE = API_URL + "users/addOrRemoveViewing";
export const GET_MY_LERNING_ROUTE = API_URL + "users/getMylearning";
export const GET_MY_CART_ROUTE = API_URL + "users/getMyCart";
export const ADD_TO_MY_CART_ROUTE = API_URL + "users/addCourseOrRemoveToCart";
export const DELETE_ALL_CART_ROUTE = API_URL + "users/deleteAllFromCart";
export const BUY_ALL_THE_CART_ROUTE = API_URL + "users/buyAllTheCart";
export const GET_WISHlIST_ROUTE = API_URL + "users/getWishList";
export const ADD_TO_WISHLIST_ROUTE = API_URL + "users/addOrRemoveToWishList";