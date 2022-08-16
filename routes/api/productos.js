const router = require('express').Router();

const productos = [];
let contador = 0;

const obtenerProdById = (id) => {
    return productos.find(item => item.id === id);
}

function buscarPosById (id) {
    return productos.findIndex(item => item.id === id);
}

function validarId(req, res, next){
    const { id } = req.params;

    if(!id){

        res.status(400).json({ error : 'Falta ingresar el id.'});

    } else if (isNaN(parseInt(id))) {

        res.status(400).json({ error : "El id ingresado no es un número."});

    }

    next();
}

function validarProducto(req, res, next){
    const { titulo, precio, url } = req.body;

    if(!titulo){
        res.status(400).json({ error : 'Falta ingresar el título del producto.'});
    }

    if(!precio){
        res.status(400).json({ error : 'Falta ingresar el precio del producto.'});
    }

    if(!url){
        res.status(400).json({ error : 'Falta ingresar el url del producto.'});
    }

    next();
}

router.get('/', (req, res) => {
    if (productos.length === 0) {
        res.status(200).json({ error : 'El listado de productos esta vacío.'});
    } else {
        res.status(200).json(productos);
    }
});

router.get('/:id', validarId, (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 1 || id > contador) {
        res.status(400).json({ error : "No existe producto con el id indicado."});
    } else {
        const posicion = buscarPosById(id);
        if (posicion !== -1) {
            console.log(obtenerProdById(id), posicion);
            res.status(200).json(obtenerProdById(id));
        } else {
            res.status(200).json({ error : "El producto no fue encontrado."});
        }
    }
});

router.post('/', validarProducto, (req, res) => {
    const { titulo, precio, url } = req.body;
    contador += 1;
    const producto = {
        "id": contador,
        "titulo": titulo,
        "precio": precio,
        "url": url
    };
    productos.push(producto);
    res.status(200).json(producto);
});

router.put('/:id', validarId, validarProducto, (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, precio, url } = req.body;

    posicion = buscarPosById(id);

    if (posicion === -1) {
        res.status(200).json({ error : "El producto no fue encontrado."});
    } else {
        const producto = productos[posicion];
        const productoUpd = 
        {   
            "id": producto.id,
            "titulo": titulo,
            "precio": precio,
            "url": url
        };
        productos[posicion] = productoUpd;
        res.status(200).json(productoUpd);
    }
});

router.delete('/:id', validarId, (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 1 || id > contador) {
        res.status(400).json({"error": "El id no pertenece a ningún producto existente."});
    } else {
        const posicion = buscarPosById(id);
        if (posicion !== -1) {
            const producto = obtenerProdById(id);
            productos.splice(posicion, 1);
            productos.forEach(prod => {if (prod.id >= id) {prod.id -= 1;}});
            contador -= 1;
            res.status(200).json(producto);
        } else {
            res.status(200).json({ error : "El producto no fue encontrado."});
        }
    }
});

module.exports = router;