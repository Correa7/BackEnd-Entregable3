const express = require('express')
const app = express()
const ProductManager =require('./ProductManager')
app.listen(8080, ()=> console.log('Servidor Corriendo en el puerto 8080'))
app.use(express.urlencoded({extended:true}))


app.get('/products/:pId', (req,res)=>{
    const pId = req.params.pId
    let product = new ProductManager("./Products.json");
    let products = product.getProducts()
    let prodFiltrado= products.find((p)=> String(p.id) == pId)
    if(!prodFiltrado){
        res.send('Producto no encontrado')
    }else{
        res.send(prodFiltrado)
    }
})
app.get('/products', (req,res)=>{
    let product = new ProductManager("./Products.json");
    let products = product.getProducts()
    let {limit} = req.query;
    let intLimit= parseInt(limit)
    console.log(limit)
    if(!intLimit){
        res.send(products)  
    }
    else{
        prod=[]
        for(let i=0; i < intLimit; i++){
        prod.push(products[i])
        }
        res.send(prod)
    }
})
