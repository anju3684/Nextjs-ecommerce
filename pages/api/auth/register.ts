import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import valid from '../../../utils/valid'
import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from 'next'
import {ErrorState} from "../../../state"

connectDB()
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

async function register(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, email, password, cf_password } = req.body

        const errMsg = valid(req.body)
        if (errMsg){
            console.log("err")
            return res.status(400).json({ err: errMsg })
        }
        const user = await Users.findOne({ email })
        if (user)
            return res.status(400).json({ err: 'This email already exists.' })

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new Users({
            name, email, password: passwordHash, cf_password
        })

        await newUser.save()
        res.json({ msg: "Register Success!" })

    } catch (err:unknown) {
        console.log("Internal server error")
        return res.status(500).json({ err: (err as ErrorState)?.message })
    }
}