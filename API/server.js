const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://dbAPI:*33Cla@CIivn@main-sb6gn.gcp.mongodb.net/WMDDev?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// models
require('./models/userModel');
require('./models/groupModel');
require('./models/questionModel');

// routes
// Import routes
let apiRoutes = require("./routes/wmdRoutes")
// Use Api routes in the App
app.use('/api', apiRoutes)

app.listen(3000, () => console.log(`Server is running on 3000!`));
