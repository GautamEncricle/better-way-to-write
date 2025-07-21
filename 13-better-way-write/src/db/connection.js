import mongoose from 'mongoose';

const connect = async function (){
    await mongoose.connect(process.env.DB_URL).then((conn) => {
        console.log(`MongoDB connected 🚀: ${conn.connection.host}`);
    }).catch((error) => {
        console.log(error);
    })
}

export default connect;