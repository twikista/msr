import mongoose from 'mongoose'

const connection = {}
export const connectDB = async () => {
  console.log('mongo run')
  try {
    if (connection.isConnected) {
      console.log('using exisiting connection')
    }

    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.log('failed to connect')
    console.log(error)
  }
}
