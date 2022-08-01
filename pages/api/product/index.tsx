/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorState } from "../../../state"


connectDB()
export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.method)
    switch (req.method) {

        case "GET":
            await getProducts(req, res)
            break;
    }

}

async function getProducts(req: NextApiRequest, res: NextApiResponse) {
    try {
        const products = await Products.find()
        console.log(products)
        res.json({
            status: 'success',
            result: products.length,
            products
        })

    } catch (err: unknown) {
        return res.status(500).json({ err: (err as ErrorState)?.message })

    }

}