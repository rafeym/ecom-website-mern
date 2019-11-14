import mongoose from 'mongoose'
const connection = {}

const connectDb = async () => {
    // Check if we are connected or not
    if(connection.isConnected){
        // Use exisiting db connection
        console.log("Using existing connection")
        return
    }
    // If not use new database connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex:true,
        useFindAndModify:false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('DB Connected')
    
    // Once connected we can use connection object to store a reference to db
    connection.isConnected = db.connections[0].readyState
}

export default connectDb