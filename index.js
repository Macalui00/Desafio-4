const express = require("express");
const {Router} = express;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(require('./routes'));

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(
        `Servidor express escuchando en el puerto ${PORT}`
    );
});

server.on('error', err => console.log(`error: ${err}`));
