const express = require('express');
const cors = require('cors');
const { getCatalog, getBasket, addToBasket, removeFromBasket } = require('./main');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./static'));

app.get('/catalog', (request, response) => {
    getCatalog().then((goods) => {
        response.setHeader('Content-type', 'application/json');
        response.send(goods);
    });
});

app.get('/basket', (request, response) => {
    getBasket().then((goods) => {
        response.setHeader('Content-type', 'application/json');
        response.send(goods);
    });
});

app.patch('/basket', (request, response) => {
    addToBasket(request.body).then((goods) => {
        response.setHeader('Content-type', 'application/json');
        response.send(goods);
    });
});

app.delete('/basket', (request, response) => {
    removeFromBasket(request.body.id).then((goods) => {
        response.setHeader('Content-type', 'application/json');
        response.send(goods);
    });
});


app.listen('8002', () => {
    console.log('server is run!');
})
