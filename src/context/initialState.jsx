import {fetchCart, fetchUser} from "../utils/fetchLocalStorageData"

// Lấy dữ liệu từ trong local ra và render ra ngoài màn hình

const useInfo = fetchUser()
const cartInfo = fetchCart()  //Khởi tạo trạng thái user ban đầu


export const initialState = {
    user: useInfo,
    fooditems: null,
    cartShow: false,
    cartItems: cartInfo,
};