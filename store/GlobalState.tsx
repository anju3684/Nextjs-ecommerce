/* eslint-disable react-hooks/exhaustive-deps */
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
    const initialState: state = { notify: {}, auth: {token:''}, cart: [], modal: [], orders: [], users: [],categories:[] }
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    const { cart, auth } = state
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin")
        if (firstLogin === "true") {
            // console.log("already logged in")
            getData('auth/accessToken', auth.token).then(res => {
                if (res.err) return localStorage.removeItem("firstLogin")
                dispatch({
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
            getData('categories','').then(res=>{
                if(res.err){
                    return dispatch({type:'NOTIFY',payload:{error:res.err}})
                }
                dispatch({type:'ADD_CATEGORIES',payload:res.categories})
            })
        }

    }, [])

    useEffect(() => {

        const cart01 = JSON.parse((localStorage.getItem("cart01")) || '[]')

        if (cart01) { dispatch({ type: 'ADD_CART', payload: cart01 }) }

    }, [])

    useEffect(() => {
        localStorage.setItem('cart01', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        if (auth?.user) {
            getData('order', auth.token)
                .then((res) => {
                    if (res.err) {
                        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                    }
                    dispatch({ type: 'ADD_ORDERS', payload: res.orders })
                })
            if (auth?.user?.role === 'admin') {
                getData('user', auth.token)
                    .then((res) => {
                        if(res.err){
                            return dispatch({type:'NOTIFY',payload:{error:res.err}})
                        }

                        dispatch({type:'ADD_USERS',payload:res.users})
                    })
            }
        }else{
            dispatch({type:'ADD_ORDERS',payload:[]})
            dispatch({type:'ADD_USERS',payload:[]})
        }

    }, [auth.token])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )

}
