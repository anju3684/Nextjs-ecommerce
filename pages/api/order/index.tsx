/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";
import auth from "../../../middleware/auth";
import Products from "../../../models/productModel"
import { NextApiRequest, NextApiResponse } from 'next'
import {ErrorState,ProductType} from "../../../state"
import { Number } from "mongoose";
connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.method)
    switch (req.method) {

        case "POST":
            await createOrder(req, res) 
            break;
    }

}
async function createOrder(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result=await auth(req,res)
        const { address,mobile,cart,total}=req.body
        const newOrder=new Orders({
            user:result.id,address,mobile,cart,total
        })

        cart.filter((item:ProductType)=>{
            return sold(item._id,item.quantity,item.inStock,item.sold)
        })

        await newOrder.save()
        res.json({
            msg:'Payment success!will contact you to confirm the order.',
            newOrder})
 
    } catch (err: unknown) {
        return res.status(500).json({ err: (err as ErrorState)?.message })

    }

}
const sold=async (id:string,quantity:number,oldInStock:number,oldSold:number)=>{
    await Products.findOneAndUpdate({_id:id},{
        inStock:oldInStock-quantity,
        sold:quantity+oldSold
    })
}