const  express  =  require('express');
const cors = require('cors');
const  user  =  require("./routes/users");


const app = express(); //Initialized express

app.use("/users",  user);  //Route for /user endpoint of API

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {

res.status(200).send("Server is perfectly working!");

})

app.listen(port, () => {

console.log(`Server is working on http://localhost:${port}.`);

})

//require("./configs/dotenv");
const pool =  require("./configs/database");

pool.connect((err) => { //Connected Database

if (err) {

console.log(err);

}

else {

console.log("Database is connected!");}

});

