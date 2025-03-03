//stateの初期値を書いていく
//どのコンポーネントでも状態を使えるようにしたい
import { Children, createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
    // user: JSON.parse(localStorage.getItem("user")) || null,
    user: null,
    // user: {
    //     _id: "67ab917e5e50b70f8acfed55",
    //     username: "shincode",
    //     email: "lukiya0109@icloud.com",
    //     password: "abcdef",
    //     profilePicture: "/person/1.jpeg",
    //     coverPicture: "",
    //     followers:[],
    //     followings: [],
    //     isAdmin: false,
    // },
    isFetching: false,
    error: false,
};

//状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user]);

    return <AuthContext.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
    }}>
        {children}
    </AuthContext.Provider>//createContextで作ったものをどこへでも提供する。
}