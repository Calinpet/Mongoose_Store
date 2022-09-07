// Dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const Product = require('./models/products');



// DATA CONFIGURATIAN
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

//MIDDLEWARE
// Body parser middleware: it creates req.body
app.use(express.urlencoded({ extended: true }));

/// Remember INDUCES (index, new, delete, update, create, edit, show) to help organize your routes and avoid any conflicts.

//INDEX
app.get('/products', (req, res)=>{
  Product.find({}, (error, allProducts)=>{
    res.render("index.ejs", {
      products: allProducts,
    });
  });
});


//NEW
app.get('/products/new', (req, res)=>{
  res.render('new.ejs');
});

//DELETE

//UPDATE

//CREATE
app.post('/products', (req, res)=>{
    Product.create(req.body, (error, createProduct)=>{
      res.redirect('/products');
    });
});

//EDIT


//SHOW
app.get('/products/:id', (req, res)=> {
Products.finById(req.params.id, (error, foundProduct)=>{
    res.render('show.ejs', {
      product: foundProduct
    })
  })
})

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));