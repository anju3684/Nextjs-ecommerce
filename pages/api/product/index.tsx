/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorState } from "../../../state"
import auth from '../../../middleware/auth'



connectDB()
export default async (req: NextApiRequest, res: NextApiResponse) => {

    switch (req.method) {

        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await createProduct(req,res)
            break;
    }

}
// type QueryString={
//     [key:string]:string | number | boolean | QueryString | null |undefined| string[]|number[]
// }   
class APIfeatures {
    public query:any;
    
    public queryString:any;
    
    constructor(query:any, queryString:any){
        console.log(query,queryString)
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}
        console.log(queryObj)
        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach((el:string) => delete queryObj[el])

        if(queryObj.category !== 'all')
            this.query.find({category: queryObj.category})
        if(queryObj.title !== 'all')
            this.query.find({title: {$regex: queryObj.title}})

        this.query.find()
        return this;
    }
  
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse) {
    try {
        const features = new APIfeatures(Products.find(), req.query)
        .filtering().sorting().paginating()
        // console.log(features)
        const products = await features.query
        // console.log(products)
       return res.json({
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