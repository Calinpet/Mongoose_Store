// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Product = require('./models/products');
require("dotenv").config();


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
app.use(methodOverride("_method"))
app.use(express.static('public'))

/// Remember INDUCES (index, new, delete, update, create, edit, show) to help organize your routes and avoid any conflicts.
//SEEDS
const storeSeeds = require('./models/storeSeeds')
app.get('/products/storeSeeds', (req, res)=>{
  Product.create(storeSeeds, (error, allProducts)=>{
    res.redirect('/products');
  });
});

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
app.delete("/products/:id", (req, res)=>{
  Product.findByIdAndRemove(req.params.id, (err,data)=>{
    res.redirect("/products")
  });
});

//UPDATE
app.put("/products/:id", (req, res)=>{
  Product.findByIdAndUpdate(
    req.params.id, 
    req. body,
    {
      new: true,
    },
    (error, updatedProduct)=> {
      res.redirect(`/products/${req.params.id}`)
    }
    )
})

//CREATE
app.post('/products', (req, res)=>{
    Product.create(req.body, (error, createProduct)=>{
      res.redirect('/products');
    });
});

//EDIT
app.get("/products", (req, res)=> {
  req.render(
    "edit.ejs"
  )
})


//SHOW
app.get('/products/:id', (req, res)=> {
Product.findById(req.params.id, (error, foundProduct)=>{
    res.render('show.ejs', {
      product: foundProduct,
    });
  });
});

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));