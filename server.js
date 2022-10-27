const { request, response } = require("express");
const contenedor = require("./Productos");
const express = require("express");
const app = express();
const PORT = 8080;
app.listen(PORT, ()=>console.log("sever funcionando en puerto 8080"));

const ProductsContainer = new contenedor("products.txt");

const randomizer = (max)=>{
    return Math.floor(Math.random()* max);
}

app.get("/productos", async (request,response)=>{
    const productos = await ProductsContainer.getAll();
    response.send(productos);
})

app.get("/productoRandom", async (request,response)=>{
    const productos = await ProductsContainer.getAll();
    const productRandom = randomizer(productos.length);
    const producto = await ProductsContainer.getById(productRandom);
    response.send(producto)

})

