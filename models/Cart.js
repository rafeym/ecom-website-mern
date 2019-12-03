import mongoose from 'mongoose'

const { ObjectId, Number } = mongoose.Schema.Types

const CartSchema = new mongoose.Schema({
    // Link user to cart through unique ObjectId provided by mongoose
    user: {
        type: ObjectId,
        ref: "User"
    },

    products: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: ObjectId,
                ref: "Product"
            }
        }
    ]
})

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema)