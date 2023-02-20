/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import { ErrorState } from "../../../state"
import auth from "../../../middleware/auth"

connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "PATCH":
            await updateRole(req, res)
            break;
        case "DELETE":
            await deletUser(req, res)
            break;
    }
}
async function updateRole(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin' || !result.root)
            return res.status(400).json({ err: "Authentication is not valid" })

        const { id } = req.query
        const { role } = req.body

        await Users.findOneAndUpdate({ _id: id }, { role })
        res.json({ msg: 'Update Success!' })
    } catch (err: unknown) {
        console.log("Internal server error")
        return res.status(500).json({ err: (err as ErrorState)?.message })
    }
}
async function deletUser(req: NextApiRequest, res: NextApiResponse) {
    try {


        const result = await auth(req, res)
        if (result.role !== 'admin' || !result.root)
            return res.status(400).json({ err: "Authentication is not valid" })

        const { id } = req.query

        await Users.findByIdAndDelete(id)
        res.json({ msg: 'Deleted Success!' })


    } catch (err: unknown) {
        console.log("Internal server error")
        return res.status(500).json({ err: (err as ErrorState)?.message })
    }
}