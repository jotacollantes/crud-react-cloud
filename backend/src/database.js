import mongoose from 'mongoose';

// const URI="mongodb://localhost/prueba";
const URI="mongodb+srv://jjcollantes:Campeon2022*@cluster0.ntcmp.mongodb.net/crud"

const connectDB=async() =>{
try {
    const db=await mongoose.connect(URI);
    console.log('base de datos conectada', db.connection.name);
} catch (error) {
    console.log('error al conectarse a la base de datos ', error.message);
}

};
export default connectDB; 