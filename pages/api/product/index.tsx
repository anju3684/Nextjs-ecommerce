/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorState } from "../../../state"
import auth from '../../../middleware/auth'



connectDB()
export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.method)
    switch (req.method) {

        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await createProduct(req,res)
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
const createProduct = async (req:NextApiRequest, res:NextApiResponse) => {
    console.log("hello")
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'})

        const {title, price, inStock, description, content, category, images} = req.body

        if(!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0)
        return res.status(400).json({err: 'Please add all the fields.'})


        const newProduct = new Products({
            title: title.toLowerCase(), price, inStock, description, content, category, images
        })

        await newProduct.save()

        res.json({msg: 'Success! Created a new product'})

    } catch (err:unknown) {
        return res.status(500).json({err:(err as ErrorState)?.message  })
    }
}