const mongoose=require('mongoose');
const mongouri="mongodb://127.0.0.1:27017/iNotebook"

const connectToMongo= async ()=>{
    await mongoose.connect(mongouri);
    console.log('now connected to mongoose')
}

module.exports=connectToMongo;