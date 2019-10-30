const express = require ('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');

/** Importar dotENV */
require('dotENV').config({path: 'variables.env'});

// Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

// Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// crear el servidor
const app = express();

// Carpeta publica
app.use(express.static('uploads'));

// Habilitar el BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Definir un dominio o dominios para recibir las peticiones
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        // Revisar si la peticion viene de un servidor que esta en whiteList
        const existe = whiteList.some(dominio => dominio === origin);
        if(existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

//Habilitar Cors
app.use(cors(corsOptions));



// Rutas de la app
app.use('/', routes());


// Configuración de puertos
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;


// Iniciar app
app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});