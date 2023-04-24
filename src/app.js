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
        res.send(`<div style="margin-top:50px;margin-left:50px;border:solid red;width:80%;justify-content:center, display:flex;flex-direction:row;text-align: center;">
        <h1 style="color:red;padding:30px;">Producto no encontrado</h1>
        </div>`)
    }else{
        res.send(`
        <div 
        style="box-shadow: hsl(0, 0%, 80%) 0 0 16px;background-color: #fff;border-radius: 4px;
        padding: 1px;width:80%;margin: 100px 100px ">

            <div style="display: flex;align-items: flex-stretch;padding-bottom: 10px;margin: 10px;border-bottom: 1px solid #ececec; ">
            
                <div style="flex:1"><strong>Id</strong></div>
                <div style="flex:1"><strong>Title</strong></div>
                <div style="flex:1"><strong>Description</strong></div>
                <div style="flex:1"><strong>Price</strong></div>
                <div style="flex:1"><strong>Thumbnail</strong></div>
                <div style="flex:1"><strong>Stock</strong></div>
                <div style="flex:1"><strong>Code</strong></div>
            </div><hr>
            <div style="display: flex;
            align-items: flex-stretch;
            padding-bottom: 10px;
            margin: 10px;
            border-bottom: 1px solid #ececec;">
                <div  style="flex:1"><p >${prodFiltrado.id}</p></div>
                <div  style="flex:1"><p >${prodFiltrado.title}</p></div>
                <div  style="flex:1"><p >${prodFiltrado.description}</p></div>
                <div  style="flex:1"><p >$ ${prodFiltrado.price}</p></div>
                <div  style="flex:1"><p >${prodFiltrado.thumbnail}</p></div>
                <div  style="flex:1"><p >${prodFiltrado.stock}</p></div>
                <div  style="flex:1"><p >${prodFiltrado.code}</p></div>
            </div>
        </div>`)
    }
})
app.get('/products', (req,res)=>{
    let product = new ProductManager("./Products.json");
    let products = product.getProducts()
    let {limit} = req.query;
    let intLimit= parseInt(limit)
    // No supe como mapear a products dentro de res.send(), para que me renderice en pantalla una tabla con todos los productos...
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
