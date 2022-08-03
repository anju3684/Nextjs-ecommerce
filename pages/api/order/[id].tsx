/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'
import { NextApiRequest, NextApiResponse } from 'next'
import {ErrorState} from "../../../state"
import auth from "../../../middleware/auth"
import Orders from '../../../models/orderModel'
connectDB()

export default async (req:NextApiRequest, res:NextApiResponse) => {
    switch(req.method){
        case "PATCH":
            await paymentOrder(req, res)
            break;
    }
}
const paymentOrder = async (req:NextApiRequest, res:NextApiResponse) => {

    try{
        const result=await auth(req,res)
        const {id}=req.query
        await Orders.findOneAndUpdate({_id:id},{
            paid:true,dateOfPayment:new Date().toISOString()
        })
        res.json({msg:'Payment success!'})

    }catch (err:unknown) {
        return res.status(500).json({err: (err as ErrorState)?.message})
    }
}