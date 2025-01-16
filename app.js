const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // Load biến môi trường từ .env

const productRoutes = require('./routes/products');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // Parse dữ liệu từ form
app.use(express.static(path.join(__dirname, 'public'))); // Phục vụ file tĩnh

app.use('/products', productRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});