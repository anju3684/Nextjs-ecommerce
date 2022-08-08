/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";
import auth from "../../../middleware/auth";
import Products from "../../../models/productModel"
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorState, ProductType } from "../../../state"
import { Number } from "mongoose";
connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.method)
    switch (req.method) {

        case "POST":
            await createOrder(req, res)
            break;

        case "GET":
            await getOrder(req, res)
            break;
    }

}
async function createOrder(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await auth(req, res)
        const { address, mobile, cart, total } = req.body
        const newOrder = new Orders({
            user: result.id, address, mobile, cart, total
        })

        cart.filter((item: ProductType) => {
            return sold((item._id || ''), (item.quantity || 0), (item.inStock || 0), (item.sold || 0))
        })

        await newOrder.save()
        res.json({
            
            newOrder
        })

    } catch (err: unknown) {
        return res.status(500).json({ err: (err as ErrorState)?.message })

    }

}
const sold = async (id: string, quantity: number, oldInStock: number, oldSold: number) => {
    await Products.findOneAndUpdate({ _id: id }, {
        inStock: oldInStock - quantity,
        sold: quantity + oldSold
    })
}
async function getOrder(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result =await auth(req,res)
        let orders;
        if(result.role!=='admin'){
            orders=await Orders.find({user:result.id}).populate("user","-password")
        }else{
            orders=await Orders.find().populate("user","-password")
        }
   
        res.json({
            orders
        })

    }catch(err:unknown){
        return res.status(500).json({ err: (err as ErrorState)?.message })
    }
}