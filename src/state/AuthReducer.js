const AuthReducer =(state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
                user: null,
                isFetvhing: true,//これから情報持ってきますよ的な
                error: false,
            };
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetvhing: false,
                error: false,
            };
        case "LOGIN_ERROR":
            return{
                user: null,
                isFetvhing: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default AuthReducer;