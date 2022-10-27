
const fs = require("fs");

class Container{
    constructor(name){
        this._name = name
    }

    async getById(id){
        try{
            const products = await this.getAll();
            const producto = products.find(element=>element.id === id)
            return producto;
        }catch(error){
            return "el archivo no  ha podido ser leido"
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(this._name,JSON.stringify([],null,2))
        } catch (error) {
            return "no se encontro el archivo que desea eliminar"
        }
    }
    async deleteById(id){
        try {
            const products = await this.getAll();
            const newProducts = products.filter(element=>element.id !== id);
            await fs.promises.writeFile(this._name,JSON.stringify(newProducts,null,2))
            return "producto eliminado"
        } catch (error) {
            return "el elemento no puede ser eliminado"
        }
    }
    async save(product){
        try{
            if(fs.existsSync(this._name)){
                const productos = await this.getAll()
                if(productos.length>0){
                    const id = productos[productos.length-1].id+1
                    product.id = id 
                    productos.push(product)
                    await fs.promises.writeFile(this._name,JSON.stringify(productos,null,2))
                }else{
                    product.id=1
                    await fs.promises.writeFile(this._name,JSON.stringify([product],null,2))
                }
            }
            else{
                product.id=1
                await fs.promises.writeFile(this._name,JSON.stringify([product],null,2))
            }

        } catch(error){
            return "el producto no pudo ser guardado"
        }
    }

    async getAll(){
        try{
            const content = await fs.promises.readFile(this._name, "utf-8");
            if(content.length>0){
                const Product = JSON.parse(content);
                return Product;
            } else{
               return [] 
            }
        } catch(error){
         return "el archivo no pudo ser leido"
        }
    }
}
module.exports = Container;
const Products = new Container('products.txt');
const producto1= {
    title: "botines Nike cr7",
    price: 17.275,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_970653-MLA44248342401_122020-O.jpg"
}

const producto2= {
    title: "camiseta River Plate titlar",
    price: 15.387,
    thumbnail: "https://http2.m.jpg"
}
const getData = async()=>{
    

    //const showProducts = await Products.getAll();
    //console.log("ShowProducts",showProducts);
    //const productFinded = await Products.getById(1);
    //console.log("Producto: ", productFinded)
    //await Products.deleteAll()
}
getData()