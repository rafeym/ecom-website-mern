import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'
import mongoose from 'mongoose'

connectDb()

const { ObjectId } = mongoose.Types

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    case 'PUT':
      await handlePutRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed`)
  }
}

const handleGetRequest = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send('No authorization token')
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product'
    })
    res.status(200).json(cart.products)
  } catch (error) {
    console.log(error)
    res.status(403).send('Please login again')
  }
}

const handlePutRequest = async (req, res) => {
  const { quantity, productId } = req.body
  // If no auth header present send back error
  if (!req.headers.authorization) {
    return res.status(401).send('No authorization token')
  }
  try {
    // Verify token coming from reqest
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )
    // 1. Get user cart based on userId
    const cart = await Cart.findOne({ user: userId })
    // 2. Check if product already exists in cart
    const productExists = cart.products.some(document =>
      ObjectId(productId).equals(document.product)
    )
    // 3. If so update quantity
    if (productExists) {
      await Cart.findOneAndUpdate(
        {
          _id: cart._id,
          'products.product': productId
        },
        { $inc: { 'products.$.quantity': quantity } }
      )
    } else {
      // 4. If not, add new product with given quantity
      const newProduct = { quantity, product: productId }
      await Cart.findOneAndUpdate(
        { _id: cart._id },
        { $addToSet: { products: newProduct } }
      )
    }
    res.status(200).send('Cart updated')
  } catch (error) {
    res.status(403).send('Please login again')
  }
}
