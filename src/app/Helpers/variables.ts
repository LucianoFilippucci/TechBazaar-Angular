// ADDRESSES
export const SERVER_ADDRESS = "http://localhost:8081";


// REQUEST TYPES
export const GET_USER_ORDER_LIST = "/order";
export const GET_SINGLE_PRODUCT = "/product/single-item";

export const ADD_ELEM_TO_CART = "/user/cart/add";

export const LOGIN = "/user/auth/login";

export const GET_CART = "/user/cart";
export const CLEAR_CART = "/user/cart/clear";
export const CHECKOUT = "/user/place-order";
export const USER_EDIT_EMAIL = "/user/edit/email";
export const REMOVE_CART_ELEMENT = "/user/cart/update-element";




// REVIEWS REQUESTS ENDPOINT
export const GET_ALL_PRODUCT_PAGED_REVIEWS = "/product/reviews";
export const LIKE_REVIEW = "/product/reviews/like";
export const FETCH_USER_REVIEW = "/product/reviews/get-user-review"
export const NEW_REVIEW = "/product/reviews/new";
export const EDIT_REVIEW = "/product/reviews/edit";
