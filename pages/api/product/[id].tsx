/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorState } from "../../../state"
import auth from "../../../middleware/auth"
connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;
        case "PUT":
            await updateProduct(req, res)
            break;
    }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;

        const product = await Products.findById(id)
        if (!product) return res.status(400).json({ err: 'This product does not exist.' })

        res.json({ product })

    } catch (err: unknown) {
        return res.status(500).json({ err: (err as ErrorState)?.message })
    }
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const result = await auth(req, res)
        console.log(result)
        if (result.role !== 'admin')
            return res.status(400).json({ err: 'Authentication is not valid.' })

        const { id } = req.query
        const { title, price, inStock, description, content, category, images } = req.body

        if (!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0)
            return res.status(400).json({ err: 'Please add all the fields.' })

        await Products.findOneAndUpdate({ _id: id }, {
            title: title.toLowerCase(), price, inStock, description, content, category, images
        })

        res.json({ msg: 'Success! Updated a product' })
    } catch (err: unknown) {
        return res.status(500).json({ err: (err as ErrorState)?.message })
    }
}

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const result = await auth(req, res)
        console.log(result)
        if (result.role !== 'admin')
            return res.status(400).json({ err: 'Authentication is not valid.' })

        const { id } = req.query

        await Products.findByIdAndDelete(id)
        res.json({ msg: 'Deleted a product.' })

    } catch (err: unknown) {
        return res.status(500).json({ err: (err as ErrorState)?.message })
    }
}