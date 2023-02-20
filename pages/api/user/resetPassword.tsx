/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import bcrypt from "bcrypt"
import {ErrorState} from "../../../state"
import auth from "../../../middleware/auth"

connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "PATCH":
            await resetPassword(req, res)
            break;
    }
}

async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result=await auth(req,res)
        // console.log(result)
        const {password}=req.body
        const passwordHash=await bcrypt.hash(password,12)
        await Users.findOneAndUpdate({_id:result.id},{password:passwordHash})
        
        res.json({msg:"Update Success!"})
        
    } catch (err: unknown) {
        console.log("Internal server error")
        return res.status(500).json({ err: (err as ErrorState)?.message })
    }
}