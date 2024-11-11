
const connectDB = require("./db/connect")
const product = require("./models/product")

const products = require("./products.json")

const start = async ()=>{
    try {
        await connectDB();
        await product.create(products);
        console.log("success");
    } catch (error) {
        console.log(error);
    }
}

start()