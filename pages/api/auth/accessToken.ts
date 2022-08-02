import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../../utils/generateToken'
import { NextApiRequest, NextApiResponse } from 'next'


connectDB()
interface IdEmail {
    id: string;
    email: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const rf_token = req.cookies.refreshToken;
        if (!rf_token) return res.status(400).json({ err: 'Please login now!' })

        const result = jwt.verify(rf_token, (process.env.REFRESH_TOKEN_SECRET || '')) as IdEmail
        if (!result) return res.status(400).json({ err: 'Your token is incorrect or has expired.' })
        console.log(result)
        const user = await Users.findById(result?.id)
        if (!user) return res.status(400).json({ err: 'User does not exist.' })

        const access_token = createAccessToken({ id: user._id })
        res.json({
            access_token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root
            }
        })
    } catch (err: any) {
        return res.status(500).json({ err: err.message })
    }
}
