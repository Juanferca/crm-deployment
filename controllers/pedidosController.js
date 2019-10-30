
const Pedidos = require('../models/Pedidos');


// Crear pedidos nuevos
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {

        await pedido.save();
        res.json({mensaje: 'Se agregó un nuevo pedido correctamente'})
        
    } catch (error) {
        console.log(error)
        next();
        
    }
} 

// Mostrar todos los pedidos

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({path: 'pedido.producto', model: 'Productos' })
        res.json(pedidos)
        
    } catch (error) {
        console.log(error);
        next();
        
    }
   
}

// Muestra un pedido por su ID

exports.mostrarPedido = async (req, res, next) => {

    try {
        const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({path: 'pedido.producto', model: 'Productos' })
        res.json(pedido)   
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Pedido no encontrado en la base de datos'})
        return next();
        
    }
    
}

// Actualizar pedido via ID
exports.actualizarPedido = async (req, res, next) => {
    try {

        let pedido = await Pedidos.findByIdAndUpdate({ _id: req.params.idPedido },
                             req.body, { new : true}.populate('cliente').populate({path: 'pedido.producto', model: 'Productos' } ));
        res.json(pedido);

        
    } catch (error) {
        console.log(error)
        res.json({mensaje: 'Pedido no encontrado en la base de datos'});
        next();
        
    }
}

// Elimina un pedido por su id
exports.eliminarPedido = async (req, res, next) => {

    try {
        await Pedidos.findByIdAndDelete({_id: req.params.idPedido});
        res.json({mensaje: 'El pedido se ha eliminado'});

        
    } catch (error) {
        console.log(error)
        res.json({mensaje: 'Pedido no encontrado en la base de dadtos'});
        
    }
}