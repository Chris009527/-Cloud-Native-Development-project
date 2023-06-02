const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {dbName:"redflag_field"});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const sportsRouter = require('./routes/sports');
const shoppingsRouter = require('./routes/shoppings');
const carpoolsRouter = require('./routes/car_pools');
const travelsRouter = require('./routes/travels');
app.use('/sports', sportsRouter);
app.use('/shoppings', shoppingsRouter);
app.use('/car_pools', carpoolsRouter);
app.use('/travels', travelsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
