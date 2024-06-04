const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();


app.use(bodyParser.json());


app.use('/api/users', userRoutes);


mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 8084;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
