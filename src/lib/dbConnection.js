import mongoose from 'mongoose'

const connectionDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        )
        console.log("Database Connected...")
    } catch (err) {
        console.log(`${err} did not connect`)
    }
}

export default connectionDB