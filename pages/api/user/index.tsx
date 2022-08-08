/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import {ErrorState} from "../../../state"
connectDB()

export default async (req:NextApiRequest, res:NextApiResponse) => {
    switch(req.method){
        case "PATCH":
            await uploadInfor(req, res)
            break;
        case "GET":
            await getUsers(req, res)
            break;
    }
}

const getUsers = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
       const result = await auth(req, res)
       if(result.role !== 'admin') 
       return res.status(400).json({err: "Authentication is not valid"})

        const users = await Users.find().select('-password')
        res.json({users})

    } catch (err:unknown) {
        return res.status(500).json({err: (err as ErrorState)?.message})
    }
}


const uploadInfor = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const result = await auth(req, res)
        const {name, avatar} = req.body

        const newUser = await Users.findOneAndUpdate({_id: result.id}, {name, avatar})

        res.json({
            msg: "Update Success!",
            user: {
                name,
                avatar,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (err:unknown) {
        return res.status(500).json({err: (err as ErrorState)?.message})
    }
}