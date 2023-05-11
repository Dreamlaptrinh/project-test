// Tao cac gia tri khoi tao ban dau cho cac ham

export const actionType = {
    SET_USER: 'SET_USER',
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionType.SET_USER:   // SET_USER khoi tao
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_FOOD_ITEMS:  // SET_FOOD_ITEMS khoi tao
            return {
                ...state,
                fooditems: action.fooditems,
            };
        case actionType.SET_CART_SHOW: // trang thai show cart ban dau
            return {
                ...state,
                cartShow: action.cartShow,
            };
        case actionType.SET_CART_ITEMS: // trang thai show cart item ban dau
            return {
                ...state,
                cartItems: action.cartItems,
            };

        default:
            return state;
    }
}
export default reducer;