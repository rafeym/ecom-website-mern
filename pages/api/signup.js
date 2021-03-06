import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import Cart from '../../models/Cart'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'


connectDb()


export default async (req,res) => {
    const {name, email, password} = req.body
    try {
        // 1. Validate name, email and password
        if(!isLength(name, {min: 3, max: 256})){
            return res.status(422).send("Name must be 3 or more characters long")
        } else if (!isLength(password, {min: 8})){
            return res.status(422).send("Password must be minimum 8 charaters long")
        } else if(!isEmail(email)){
            return res.status(422).send("Email must be valid")
        }
        // 2. Check if user exists in the database
        const user = await User.findOne({email})
        if(user){
            return res.status(422).send(`User already exists with email ${email}`)
        }
        // 3. --if not hash their password
        const hash = await bcrypt.hash(password, 10)
        // 4. Create user
        const newUser = await new User({
            name,
            email,
            password: hash
        }).save()
        console.log({newUser})
        // 5. Create cart for new user
        await new Cart({
            user: newUser._id
        }).save()
        // 6. Create token for the new user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        // 7. Send back token in response
        res.status(201).json(token)
    } catch (error) {
        console.error(error)
        res.status(500).send("Error signing up user. Please try again later.")
    }
}