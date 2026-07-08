// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const AuthRouter = require('./Routes/AuthRouter');

// const app = express();

// app.use(cors());
// app.use(express.json());``

// mongoose.connect(
//     'mongoose.connect(process.env.MONGO_URI);'
// )
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));

// app.use('/auth', AuthRouter);

// app.listen(8000, () => {
//     console.log('Server running on 8000');
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const AuthRouter = require('./Routes/AuthRouter');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://husnain:husnain123@cluster0.0awkwmh.mongodb.net/?appName=Cluster0')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use('/auth', AuthRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});