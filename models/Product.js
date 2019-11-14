import mongoose from 'mongoose'
import shortid from 'shortid'

const { String, Number } = mongoose.Schema.Types

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
        unique: true,
        default: shortid.generate()
    },
    description: {
        type: String,
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    }
})

// If existing Product model exist use that otherwise create new Product schema
export default mongoose.models.products || mongoose.model('products', ProductSchema)