const express = require("express");
const pasth = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  // if user already exits
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("User already exist. please choose a different username ");
  } else {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(data.password, saltRound);

    data.password = hashPassword;
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});
// login

app.post("/login",async (req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.username})
        if(!check){
            res.send("User name cannot found")
        }
        const isPassword=await bcrypt.compare(req.body.password,check.password)
        if(isPassword){
            res.render("home")
        }
        else{
            req.send("Wrong Password")
        }
    }catch{
            res.send("Wrong Detail");
    }
})
const port = 5000;
app.listen(port, () => {
  console.log(`surver running on port :${port}`);
});
