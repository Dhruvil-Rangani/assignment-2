const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel");

//for using middleware
app.use(express.json());// returns middleware that only parses json
app.use(express.urlencoded({ extended: false })); //Returns middleware that only parses urlencoded bodies

//respond message to the home page
app.get("/", (req, res) => {
  res.status(200).json({message: "Welcome to DressStore Application"});
})

// Route set-up to get all Products from the database
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Route setup to get product with id number from the databse
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Route setup to find all the products which contains particular letter in the name from the database
app.get("/api/products", async(req,res) => {
  try {
    const keyword = req.query.name;
  if (!keyword) {
    return res.status(400).json({ error: 'Name keyword is required in the query parameter.' });
  }
  // Filter products based on the keyword
  const filteredProducts = await Product.find(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase()))
  res.json(filteredProducts);
  } catch(error){
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

//Route setup to add a new product in the database
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

// Route setup to update product by id in the databse
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // Error handiling if id does not exist
    if (!product) {
      return res.status(404).json({ message: `cannot find product with id: ${id}` })
    }
    const updateProduct = await Product.findByIdAndUpdate(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

// Route setup to delete product by id from the database
app.delete("/api/products/:id", async(req,res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).send(`Cannot find product with id :${id}`);
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

// Route setup to delete all the products contains in the database
app.delete("/api/products", async(req,res) =>{
  try {
    const product = await Product.deleteMany({});
    if(!product){
      return res.status(404).send(`Cannot find product with id :${id}`);
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

const PORT = process.env.PORT || 3030;

mongoose.connect("mongodb+srv://dhruvil:dhruvil007@cluster0.ca70xf0.mongodb.net/Marketplace?retryWrites=true&w=majority").then(() => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((e) => {
  console.error(e);
});