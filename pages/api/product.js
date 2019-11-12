import products from '../../static/products.json'
export default (req,res) => {
    console.log(`the request is a ${req.method} request`)
    res.status(200).json(products)
}