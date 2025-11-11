require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const allroute = require("./routes/auth");
const mongoose = require("mongoose");

const port = process.env.PORT;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(()=>{console.log("MongoDB Connected Successfully!")})
.catch(e =>{console.error("MongoDB Not Connected-----")});

app.use(express.urlencoded({ extended: true }));//Parse the data

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});//Serve files

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'signup.html'));
});

app.use("/api/auth",allroute);

app.listen(parseInt(port),()=>
{

    console.log(`Server started on port ${port}`);
}

)