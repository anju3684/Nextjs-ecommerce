import jwt, { JwtPayload } from 'jsonwebtoken';
import Users from '../models/userModel';
import { NextApiRequest, NextApiResponse } from 'next'
const auth = async (req: NextApiRequest, res: NextApiResponse) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({ err: 'Invalid Authentication' })
    }
    const decoded = jwt.verify(token, (process.env.ACCESS_TOKEN_SECRET || ''))
    // console.log(decoded)
    if (!decoded) {
        return res.status(400).json({ err: 'Invalid Authentication' })
    }

    const user = await Users.findOne({ _id: (decoded as JwtPayload).id })
    // return {id:user._id};
    return user;



}

export default auth