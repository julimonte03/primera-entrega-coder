import express from 'express';
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
