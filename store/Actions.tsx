// @ts-ignore: Object is possibly 'null'.
import { ProductType, Cart,Order } from "../state"
export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_CART: 'ADD_CART',
    ADD_MODAL:'ADD_MODAL',
    ADD_ORDERS:'ADD_ORDERS',
}

export const addToCart = (product: ProductType, cart: ProductType[]) => {
    //console.log(cart)

    if (product.inStock === 0)
        return ({ type: 'NOTIFY', payload: { error: 'This product is out of stock.' } })

    const check = cart.every((item: ProductType) => {
        return item?._id !== product._id
    })

    if (!check) {
        return ({ type: 'NOTIFY', payload: { error: 'The product has been added to cart' } })
    }
    return ({ type: 'ADD_CART', payload: [...cart, { ...product, quantity: 1 }] })
}
export const decrease = (data: ProductType[], id: string) => {
    
    const newData = [...data]
    newData.forEach(item => {
        if (item._id === id) { 
            item.quantity -= 1 
        }
    })

    return ({ type: 'ADD_CART', payload: newData })
}

export const increase = (data: ProductType[], id: string) => {
    const newData = [...data]
    newData.forEach(item => {
        if (item._id === id) item.quantity += 1
    })

    return ({ type: 'ADD_CART', payload: newData })
}

export const deleteItem=(data:ProductType[],id:string,type:string)=>{
    console.log(data)
    const newData=data.filter((item:any)=>item._id!==id)
    return({type:type,payload:newData})

}
export const updateItem=(data:Order[],id:string | '',post:any,type:string)=>{
    const newData = data.map(item => (item._id === id ? post : item))
    return ({ type, payload: newData})
}