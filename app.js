const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//register routes;
//const newsRoutes= require("./routes/news.routes");
const usersRoutes= require("./routes/users.routes");

//app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/users",usersRoutes);

dotenv.config();
//Attach DB
const connectionString =process.env.MONGO_CONNECTION;

const db=process.env.DB_NAME;

mongoose.connect(connectionString+db).then(()=>{
    console.log("DB IS CONNECTED");
}).catch((error)=>{
    console.log(error);
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;