import { createContext, useReducer, Dispatch, useEffect, useContext } from "react";
import reducer from "./Reducers";
import { state, Action } from "../state"
import { getData } from "../utils/fetchData"
interface Props {
    children: React.ReactNode;
}

interface InitContextProps {
    state: state;
    dispatch: Dispatch<Action>;
}

export const DataContext = createContext({} as InitContextProps)



export const DataProvider: React.FC<Props> = ({ children }) => {
    const initialState: state = { notify: {}, auth: {}, cart: [] }
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    const {cart}=state
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin")
        if (firstLogin === "true") {
            // console.log("already logged in")
            getData('auth/accessToken').then(res => {
                if (res.err) return localStorage.removeItem("firstLogin")
                dispatch({
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
        }

    }, [])

    useEffect(() => {
        const  cart01 = JSON.parse(localStorage.getItem("cart01") || '')
        console.log(cart01)
        if (cart01){ dispatch({ type: 'ADD_CART', payload:cart01 })}
    }, [])

    useEffect(()=>{
        localStorage.setItem('cart01',JSON.stringify(cart))
    },[cart])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )

}
