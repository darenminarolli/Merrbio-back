const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser")
dotenv.config();
const app = express();

connectDB();


const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';  

app.use(cors({
  origin: CLIENT_URL,  
  credentials: true,   
}));
  app.use(express.json())
  app.use(cookieParser())

app.use('/api/products', require('./routes/product.routes'));
app.use('/api/requests',require('./routes/request.routes'));
app.use('/api/auth', require('./routes/auth.routes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
