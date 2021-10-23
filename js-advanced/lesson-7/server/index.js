const express = require('express');
const cors = require('cors');
const { getCatalog, getBasket, addToBasket, removeFromBasket } = require('./main');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./static'));

app.get('/catalog', (request, resolve) => {
    getCatalog().then((goods) => {
        resolve.setHeader('Content-type', 'application/json');
        resolve.send(goods);
    });
});

app.get('/basket', (request, resolve) => {
    getBasket().then((goods) => {
        resolve.setHeader('Content-type', 'application/json');
        resolve.send(goods);
    });
});

app.patch('/basket', (request, resolve) => {
    addToBasket(request.body).then((goods) => {
        resolve.setHeader('Content-type', 'application/json');
        resolve.send(goods);
    });
});

app.delete('/basket', (request, resolve) => {
    removeFromBasket(request.body.id).then((goods) => {
        resolve.setHeader('Content-type', 'application/json');
        resolve.send(goods);
    });
});


app.listen('8002', () => {
    console.log('server is run!');
})
