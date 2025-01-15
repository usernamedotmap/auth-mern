import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected in MONGO DB: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connection in MONGO DB", error.message)
        process.exit(1)
    }
}